import * as test from 'tape'
import * as sinon from 'sinon'
import * as clone from 'clone'
import { CoreClient } from '../client'
import Application, { Event, Task, Result } from '.';
import { EventEmitter } from 'events';

class testClient {
    startServiceError: Error
    startServiceData: any
    executeTaskData: Error
    executeTaskError: any

    constructor(startServiceError?, startServiceData?, executeTaskError?, executeTaskData?){
        this.startServiceError = startServiceError;
        this.startServiceData = startServiceData;
        this.executeTaskError = executeTaskError;
        this.executeTaskData = executeTaskData;
    }

    listenEvent(): EventEmitter {
        return new EventEmitter;
    }
    listenResult(): EventEmitter {
        return new EventEmitter;
    }
    executeTask(_, cb){ 
        cb(this.executeTaskError, this.executeTaskData);
    }
    startService(_, cb){ 
        cb(this.startServiceError, this.startServiceData);
    }
}

function newApplication(client: testClient): Application {
    return new Application({
        client: client as any as CoreClient,
    })
}

test('Application should expose gRPC api', (t) => {
    t.plan(1);
    const client = new testClient;
    const application = newApplication(client);
    t.ok(<CoreClient>application.api);
});

const event: Event = {
    serviceID: 'id',
    eventKey: '*',
    filter: (_, eventData) => eventData['foo'] == 'bar'
};
const result: Result = {
    serviceID: 'id',
    taskKey: '*',
    outputKey: '*',
    tagFilters: ['tag1', 'tag2'],
    filter: (_, outputData) => outputData['foo'] == 'bar'
};
const task: Task = {
    serviceID: 'id1',
    taskKey: 'key',
    tags: ['tag3', 'tag4'],
    inputs: { data: 'object' }
};

test('startService() should throw an error', async function(t) {
    t.plan(1);
    const client = new testClient(new Error);
    const application = newApplication(client);
    try { 
        await application.whenEvent(event, task);
        t.fail("should throw");
     } catch(e){
        t.pass();
     }
});

test('whenEvent() should start two services', async function(t) {
    t.plan(3);
    const client = new testClient();
    const application = newApplication(client);
    const spy = sinon.spy(client, 'startService');
    try { 
        await application.whenEvent(event, task);
        t.pass();
    } catch(e){
        t.fail("should not throw");
    }
    t.equal(spy.getCall(0).args[0].serviceID, event.serviceID);
    t.equal(spy.getCall(1).args[0].serviceID, task.serviceID);
    spy.restore();
});


test('whenResult() should start two services', async function(t) {
    t.plan(3);
    const client = new testClient();
    const application = newApplication(client);
    const spy = sinon.spy(client, 'startService');
    try { 
        await application.whenResult(result, task);
        t.pass();
    } catch(e){
        t.fail("should not throw");
    }
    t.equal(spy.getCall(0).args[0].serviceID, result.serviceID);
    t.equal(spy.getCall(1).args[0].serviceID, task.serviceID);
    spy.restore();
});

test('whenEvent() should execute task', async function(t) {
    t.plan(6);
    const client = new testClient();
    const application = newApplication(client);
    const spy = sinon.spy(client, 'listenEvent');
    const spy1 = sinon.spy(client, 'executeTask');
    const stream = <EventEmitter>await application.whenEvent(event, task);
    const args = spy.getCall(0).args[0];
    t.equal(args.serviceID, event.serviceID);
    t.equal(args.eventFilter, event.eventKey);
    stream.emit('data', { eventKey: 'key', eventData: "{\"foo\":\"bar\"}" });
    const args1 = spy1.getCall(0).args[0];
    t.equal(args1.serviceID, task.serviceID);
    t.equal(args1.taskKey, task.taskKey);
    t.equal(args1.executionTags, task.tags);
    t.equal(args1.inputData, JSON.stringify(task.inputs));
    spy.restore();
    spy1.restore();
});

test('whenEvent() with different data filters', async function(t) {
    const tests = [
        { assertion: true },
        { assertion: true,  filter: (eventKey, eventData) => eventData['foo'] == 'bar' },
        { assertion: false, filter: (eventKey, eventData) => eventData['foo'] != 'bar' },
        { assertion: true,  filter: (eventKey, eventData) => eventKey == 'key' },
        { assertion: false, filter: (eventKey, eventData) => eventKey != 'key' }
    ];

    t.plan(tests.length);
    
    tests.forEach(async (el) => {
        const client = new testClient();
        const application = newApplication(client);
        const event: Event = {
            serviceID: 'id',
            eventKey: '*',
            filter: el.filter,
        };
        const spy = sinon.spy(client, 'executeTask');
        const stream = <EventEmitter>await application.whenEvent(event, task);
        stream.emit('data', {
            eventKey: 'key',
            eventData: "{\"foo\":\"bar\"}"
        });
        t.ok(spy.calledOnce == el.assertion)
        spy.restore();
    });
});

test('whenResult() should execute task', async function(t) {
    t.plan(8);
    const client = new testClient();
    const application = newApplication(client);
    const spy = sinon.spy(client, 'listenResult');
    const spy1 = sinon.spy(client, 'executeTask');
    const stream = <EventEmitter>await application.whenResult(result, task);
    const args = spy.getCall(0).args[0];
    t.equal(args.serviceID, result.serviceID);
    t.equal(args.taskFilter, result.taskKey);
    t.equal(args.outputFilter, result.outputKey);
    t.equal(args.tagFilters, result.tagFilters);
    stream.emit('data', { outputKey: 'key', outputData: "{\"foo\":\"bar\"}" });
    const args1 = spy1.getCall(0).args[0];
    t.equal(args1.serviceID, task.serviceID);
    t.equal(args1.taskKey, task.taskKey);
    t.equal(args1.executionTags, task.tags);
    t.equal(args1.inputData, JSON.stringify(task.inputs));
    spy.restore();
    spy1.restore();
});

test('whenResult() with different data filters', async function(t) {
    const tests = [
        { assertion: true },
        { assertion: true,  filter: (outputKey) => outputKey == 'key' },
        { assertion: false, filter: (outputKey) => outputKey != 'key' },
        { assertion: true,  filter: (outputKey, outputData) => outputData['foo'] == 'bar' },
        { assertion: false, filter: (outputKey, outputData) => outputData['foo'] != 'bar' },
        { assertion: true,  filter: (outputKey, outputData, taskKey) => taskKey == 'taskX' },
        { assertion: false, filter: (outputKey, outputData, taskKey) => taskKey != 'taskX' },
        { assertion: true,  filter: (outputKey, outputData, taskKey, tags) => tags[0] == 'tag1' },
        { assertion: false, filter: (outputKey, outputData, taskKey, tags) => tags[0] != 'tag1' }
    ];

    t.plan(tests.length);
    
    tests.forEach(async (el) => {
        const client = new testClient();
        const application = newApplication(client);
        const result: Result = {
            serviceID: 'id',
            task: '*',
            output: '*',
            tagFilters: ['tag1', 'tag2'],
            filter: el.filter,
        };
        const spy = sinon.spy(client, 'executeTask');
        const stream = <EventEmitter>await application.whenResult(result, task);
        stream.emit('data', {
            outputKey: 'key',
            outputData: "{\"foo\":\"bar\"}",
            taskKey: 'taskX',
            executionTags: ['tag1', 'tag2']
        });
        t.ok(spy.calledOnce == el.assertion)
        spy.restore();
    });
});

test('whenEvent() with different task inputs', async function(t) {
    const tests = [
        { inputsSent: {} },
        { inputs: {}, inputsSent: {} },
        { inputs: { a: '1', b: '2' }, inputsSent: { a: '1', b: '2' } },
        { inputs: (eventKey, eventData) => {
            return { a: '1', b: '2' }
        }, inputsSent: { a: '1', b: '2' } },
        { inputs: (eventKey, eventData) => {
            return { eventKey, eventData }
        }, inputsSent: { eventKey: 'key', eventData: { foo: 'bar' } } },
    ];

    t.plan(tests.length);
    
    tests.forEach(async (el) => {
        const client = new testClient();
        const application = newApplication(client);
        const event: Event = {
            serviceID: 'id',
        };
        const spy = sinon.spy(client, 'executeTask');
        const task0: Task = clone(task);
        task0.inputs = el.inputs;
        const stream = <EventEmitter>await application.whenEvent(event, task0);
        stream.emit('data', {
            eventKey: 'key',
            eventData: "{\"foo\":\"bar\"}"
        });
        const args = spy.getCall(0).args[0];
        t.equal(args.inputData, JSON.stringify(el.inputsSent));
        spy.restore();
    });
});

test('whenResult() with different task inputs', async function(t) {
    const tests = [
        { inputsSent: {} },
        { inputs: {}, inputsSent: {} },
        { inputs: { a: '1', b: '2' }, inputsSent: { a: '1', b: '2' } },
        { inputs: (outputKey, outputData, taskKey, executionTags) => {
            return { a: '1', b: '2' }
        }, inputsSent: { a: '1', b: '2' } },
        { inputs: (outputKey, outputData, taskKey, executionTags) => {
            return { outputKey, outputData, taskKey, executionTags }
        }, inputsSent: { outputKey: 'key', outputData: { foo: 'bar' },
            taskKey: 'taskX', executionTags: ['tag1', 'tag2'] } },
    ];

    t.plan(tests.length);
    
    tests.forEach(async (el) => {
        const client = new testClient();
        const application = newApplication(client);
        const result: Result = {
            serviceID: 'id',
        };
        const spy = sinon.spy(client, 'executeTask');
        const task0: Task = clone(task);
        task0.inputs = el.inputs;
        const stream = <EventEmitter>await application.whenResult(result, task0);
        stream.emit('data', {
            outputKey: 'key',
            outputData: "{\"foo\":\"bar\"}",
            taskKey: 'taskX',
            executionTags: ['tag1', 'tag2']
        });
        const args = spy.getCall(0).args[0];
        t.equal(args.inputData, JSON.stringify(el.inputsSent));
        spy.restore();
    });
});

test('whenEvent() with different task tags', async function(t) {
    const tests = [
        { tagsSent: [] },
        { tags: [], tagsSent: [] },
        { tags: ['1', '2'], tagsSent: ['1', '2'] },
        { tags: (eventKey, eventData) => {
            return ['1', '2']
        }, tagsSent: ['1', '2'] },
        { tags: (eventKey, eventData) => {
            return [ eventKey, eventData.foo ]
        }, tagsSent: [ 'key', 'bar' ] },
    ];

    t.plan(tests.length);
    
    tests.forEach(async (el) => {
        const client = new testClient();
        const application = newApplication(client);
        const event: Event = {
            serviceID: 'id',
        };
        const spy = sinon.spy(client, 'executeTask');
        const task0: Task = clone(task);
        task0.tags = el.tags;
        const stream = <EventEmitter>await application.whenEvent(event, task0);
        stream.emit('data', {
            eventKey: 'key',
            eventData: "{\"foo\":\"bar\"}"
        });
        const args = spy.getCall(0).args[0];
        t.same(args.executionTags, el.tagsSent);
        spy.restore();
    });
});

test('whenResult() with different task tags', async function(t) {
    const tests = [
        { tagsSent: [] },
        { tags: [], tagsSent: [] },
        { tags: ['1', '2'], tagsSent: ['1', '2'] },
        { tags: (outputKey, outputData, taskKey, executionTags) => {
            return ['1', '2']
        }, tagsSent: ['1', '2'] },
        { tags: (outputKey, outputData, taskKey, executionTags) => {
            return [ outputKey, outputData.foo, taskKey, executionTags[0] ]
        }, tagsSent: [ 'key', 'bar', 'taskX', 'tag1' ] },
    ];

    t.plan(tests.length);
    
    tests.forEach(async (el) => {
        const client = new testClient();
        const application = newApplication(client); 
        const result: Result = {
            serviceID: 'id',
        };
        const spy = sinon.spy(client, 'executeTask');
        const task0: Task = clone(task);
        task0.tags = el.tags;
        const stream = <EventEmitter>await application.whenResult(result, task0);
        stream.emit('data', {
            outputKey: 'key',
            outputData: "{\"foo\":\"bar\"}",
            taskKey: 'taskX',
            executionTags: ['tag1', 'tag2']
        });
        const args = spy.getCall(0).args[0];
        t.same(args.executionTags, el.tagsSent);
        spy.restore();
    });
});
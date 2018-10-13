import * as test from 'tape'
import * as sinon from 'sinon'
import { EventEmitter } from "events";
import Application, { Result, Event, Task } from "./application";
import { CoreClient } from "../client/api-core_pb_service";
import { StartServiceRequest, ExecuteTaskRequest, ListenEventRequest, EventData, ListenResultRequest, ResultData } from '../client/api-core_pb';

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
    filter: (_, outputData) => outputData['foo'] == 'bar'
};
const task: Task = {
    serviceID: 'id1',
    taskKey: 'key',
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
    const eventServiceID = new StartServiceRequest()
    const taskServiceID = new StartServiceRequest()
    eventServiceID.setServiceid(event.serviceID)
    taskServiceID.setServiceid(task.serviceID)
    t.deepEqual(spy.getCall(0).args[0], eventServiceID);
    t.deepEqual(spy.getCall(1).args[0], taskServiceID);
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
    const resultServiceID = new StartServiceRequest()
    const taskServiceID = new StartServiceRequest()
    resultServiceID.setServiceid(result.serviceID)
    taskServiceID.setServiceid(task.serviceID)
    t.deepEqual(spy.getCall(0).args[0], resultServiceID);
    t.deepEqual(spy.getCall(1).args[0], taskServiceID);
    spy.restore();
});

test('whenEvent() should execute task', async function(t) {
    t.plan(5);
    const client = new testClient();
    const application = newApplication(client);
    const spy = sinon.spy(client, 'listenEvent');
    const spy1 = sinon.spy(client, 'executeTask');
    const stream = <any>await application.whenEvent(event, task);
    const args = <ListenEventRequest>spy.getCall(0).args[0];
    t.equal(args.getServiceid(), event.serviceID);
    t.equal(args.getEventfilter(), event.eventKey);
    const data = new EventData()
    data.setEventkey('key');
    data.setEventdata("{\"foo\":\"bar\"}");
    stream.emit('data', data);
    const args1 = <ExecuteTaskRequest>spy1.getCall(0).args[0];
    t.equal(args1.getServiceid(), task.serviceID);
    t.equal(args1.getTaskkey(), task.taskKey);
    t.equal(args1.getInputdata(), JSON.stringify(task.inputs));
    spy.restore();
    spy1.restore();
});

test('whenEvent() with different data filters', async function(t) {
    const tests = [{
        data: { eventKey: 'key', eventData: "{\"foo\":\"bar\"}" },
        assertion: true,
    },{
        data: { eventKey: 'key', eventData: "{\"foo\":\"bar\"}" },
        filter: (_, eventData) => eventData['foo'] == 'bar',
        assertion: true,
    },{
        data: { eventKey: 'key', eventData: "{\"foo\":\"bar\"}" },
        filter: (_, eventData) => eventData['foo'] == 'baz',
        assertion: false,
    },{
        data: { eventKey: 'key', eventData: "{\"foo\":\"bar\"}" },
        filter: (eventKey, _) => eventKey == 'key',
        assertion: true,
    },{
        data: { eventKey: 'key', eventData: "{\"foo\":\"bar\"}" },
        filter: (eventKey, _) => eventKey == 'baz',
        assertion: false,
    }]

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
        const stream = <any>await application.whenEvent(event, task);
        const data = new EventData();
        data.setEventkey(el.data.eventKey);
        data.setEventdata(el.data.eventData);
        stream.emit('data', data);
        t.ok(spy.calledOnce == el.assertion)
        spy.restore();
    });
});

test('whenResult() should execute task', async function(t) {
    t.plan(6);
    const client = new testClient();
    const application = newApplication(client);
    const spy = sinon.spy(client, 'listenResult');
    const spy1 = sinon.spy(client, 'executeTask');
    const stream = <any>await application.whenResult(result, task);
    const args = <ListenResultRequest>spy.getCall(0).args[0];
    t.equal(args.getServiceid(), result.serviceID);
    t.equal(args.getTaskfilter(), result.taskKey);
    t.equal(args.getOutputfilter(), result.outputKey);
    const data = new ResultData();
    data.setOutputkey('key');
    data.setOutputdata("{\"foo\":\"bar\"}");
    stream.emit('data', data);
    const args1 = <ExecuteTaskRequest>spy1.getCall(0).args[0];
    t.equal(args1.getServiceid(), task.serviceID);
    t.equal(args1.getTaskkey(), task.taskKey);
    t.equal(args1.getInputdata(), JSON.stringify(task.inputs));
    spy.restore();
    spy1.restore();
});

test('whenResult() with different data filters', async function(t) {
    const tests = [{
        data: { outputKey: 'key', outputData: "{\"foo\":\"bar\"}" },
        assertion: true,
    },{
        data: { outputKey: 'key', outputData: "{\"foo\":\"bar\"}" },
        filter: (_, outputData) => outputData['foo'] == 'bar',
        assertion: true,
    },{
        data: { outputKey: 'key', outputData: "{\"foo\":\"bar\"}" },
        filter: (_, outputData) => outputData['foo'] == 'baz',
        assertion: false,
    },{
        data: { outputKey: 'key', outputData: "{\"foo\":\"bar\"}" },
        filter: (outputKey, _) => outputKey == 'key',
        assertion: true,
    },{
        data: { outputKey: 'key', outputData: "{\"foo\":\"bar\"}" },
        filter: (outputKey, _) => outputKey == 'baz',
        assertion: false,
    }]

    t.plan(tests.length);
    
    tests.forEach(async (el) => {
        const client = new testClient();
        const application = newApplication(client);
        const result: Result = {
            serviceID: 'id',
            task: '*',
            output: '*',
            filter: el.filter,
        };
        const spy = sinon.spy(client, 'executeTask');
        const stream = <any>await application.whenResult(result, task);
        const data = new ResultData();
        data.setOutputkey(el.data.outputKey);
        data.setOutputdata(el.data.outputData);
        stream.emit('data', data);
        t.ok(spy.calledOnce == el.assertion)
        spy.restore();
    });
});
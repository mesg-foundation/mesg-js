import * as test from 'tape'
import * as sinon from 'sinon'
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

const event: Event = { serviceID: 'id', filter: '*' };
const result: Result = { serviceID: 'id', task: '*', output: '*' };
const task: Task = { serviceID: 'id1', taskKey: 'key', inputs: { data: 'object' } };

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
    t.plan(5);
    const client = new testClient();
    const application = newApplication(client);
    const spy = sinon.spy(client, 'listenEvent');
    const spy1 = sinon.spy(client, 'executeTask');
    const stream = <EventEmitter>await application.whenEvent(event, task);
    const args = spy.getCall(0).args[0];
    t.equal(args.serviceID, event.serviceID);
    t.equal(args.eventFilter, event.filter);
    stream.emit('data', {});
    const args1 = spy1.getCall(0).args[0];
    t.equal(args1.serviceID, task.serviceID);
    t.equal(args1.taskKey, task.taskKey);
    t.equal(args1.inputData, JSON.stringify(task.inputs));
    spy.restore();
    spy1.restore();
});

test('whenResult() should execute task', async function(t) {
    t.plan(6);
    const client = new testClient();
    const application = newApplication(client);
    const spy = sinon.spy(client, 'listenResult');
    const spy1 = sinon.spy(client, 'executeTask');
    const stream = <EventEmitter>await application.whenResult(result, task);
    const args = spy.getCall(0).args[0];
    t.equal(args.serviceID, result.serviceID);
    t.equal(args.taskFilter, result.task);
    t.equal(args.outputFilter, result.output);
    stream.emit('data', {});
    const args1 = spy1.getCall(0).args[0];
    t.equal(args1.serviceID, task.serviceID);
    t.equal(args1.taskKey, task.taskKey);
    t.equal(args1.inputData, JSON.stringify(task.inputs));
    spy.restore();
    spy1.restore();
});
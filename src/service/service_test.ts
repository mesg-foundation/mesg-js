import * as test from 'tape'
import * as sinon from 'sinon'
import Service from './service'
import { EventEmitter } from 'events';
import { ServiceClient } from '../client/api-service_grpc_pb';
import { ListenTaskRequest, EmitEventRequest, SubmitResultRequest } from '../client/api-service_pb';

class testClient {
    listenTask(): EventEmitter {
        return new EventEmitter;
    }
    emitEvent(){}
    submitResult(){}
}

const token = "token"

function newService(config: any, client: testClient): Service {
    return new Service({
        token: token,
        mesgConfig: config,
        client: client as any as ServiceClient,
    })
}

test('listenTask() should pass task validation', function (t) {
    t.plan(1);
    const client = new testClient;
    const mesgConfig = { tasks: {"task1": {}, "task2": {}} };
    const service = newService(mesgConfig, client);
    try {
        service.listenTask({ "task1": () => {},  "task2": () => {} });
        t.pass("tasks valid");
    } catch(e) {
        t.error(e);
    }
});

test('listenTask() should throw because missing task in mesg.yml', function (t) {
    t.plan(1);
    const client = new testClient;
    const mesgConfig = { tasks: {"task1": {}} };
    const service = newService(mesgConfig, client);
    try {
        service.listenTask({ "task1": () => {},  "task2": () => {} });
        t.fail("should throw");
    } catch(e) {
        t.ok(e);
    }
});

test('listenTask() should throw because missing task callback', function (t) {
    t.plan(1);
    const client = new testClient;
    const mesgConfig = { tasks: {"task1": {}, "task2": {}} };
    const service = newService(mesgConfig, client);
    try {
        service.listenTask({ "task1": () => {} });
        t.fail("should throw");
    } catch(e) {
        t.ok(e);
    }
});

test('listenTask() should throw when called more than once', function (t) {
    t.plan(1);
    const client = new testClient;
    const mesgConfig = { tasks: {"task1": {}} };
    const service = newService(mesgConfig, client);
    service.listenTask({ "task1": () => {} });
    try {
        service.listenTask({ "task1": () => {} });
        t.fail("should throw");
    } catch(e) {
        t.ok(e);
    }
});

test('listenTask() should listen for tasks', function (t) {
    t.plan(2);
    const client = new testClient;
    const spy = sinon.spy(client, 'listenTask');
    const mesgConfig = { tasks: {'task1': {}, 'task2': {}} };
    const service = newService(mesgConfig, client);
    service.listenTask({ 'task1': () => {}, 'task2': () => {} });
    t.ok(spy.calledOnce);
    const req = new ListenTaskRequest();
    req.setToken(token);
    t.deepEqual(spy.getCall(0).args[0], req);
    spy.restore();
});

test('listenTask() should handle tasks and submit result', function (t) {
    t.plan(3);
    const executionID = 'id';
    const inputData = {input: 'data'};
    const outputData = {output: 'data'};
    const client = new testClient;
    const mesgConfig = { tasks: {'task1': {
        outputs: { success: {} }
    }} };
    const service = newService(mesgConfig, client);
    const stream = <any>service.listenTask({ 'task1': (inputs, outputs) => {
        t.equal(inputData, inputData);
        t.ok(outputs.success);
        outputs.success(outputData);
    } });
    const spy = sinon.spy(client, 'submitResult');
    stream.emit('data', {
        getExecutionid() { return executionID },
        getTaskkey() { return 'task1' },
        getInputdata() { return JSON.stringify(inputData) }
    });
    const args = <SubmitResultRequest>spy.getCall(0).args[0];
    spy.restore();
    const req = new SubmitResultRequest();
    req.setExecutionid(executionID)
    req.setOutputkey('success')
    req.setOutputdata(JSON.stringify(outputData))
    t.deepEqual(args, req);
});

test('emitEvent() should emit an event', function (t) {
    t.plan(3);
    const event = 'event1';
    const eventData = {event: 'data'};
    const client = new testClient;
    const mesgConfig = {};
    const service = newService(mesgConfig, client);
    const spy = sinon.spy(client, 'emitEvent');
    service.emitEvent(event, eventData);
    const args = <EmitEventRequest>spy.getCall(0).args[0];
    t.equal(args.getToken(), token);
    t.equal(args.getEventkey(), event);
    t.equal(args.getEventdata(), JSON.stringify(eventData));
    spy.restore();
});
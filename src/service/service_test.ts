import * as test from 'tape'
import * as sinon from 'sinon'
import Service from './service'
import { EventEmitter } from 'events';

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
    definition: config,
    client: client
  })
}

test('Service should expose the service gRPC api', (t) => {
  t.plan(1);
  const client = new testClient;
  const definition = { tasks: {"task1": {}} };
  const service = newService(definition, client);
  t.ok(service.api);
});

test('listenTask() should pass task validation', function (t) {
  t.plan(1);
  const client = new testClient;
  const definition = { tasks: {"task1": {}, "task2": {}} };
  const service = newService(definition, client);
  const spy = sinon.stub(service, 'listenTask');
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
  const definition = { tasks: {"task1": {}} };
  const service = newService(definition, client);
  try {
    service.listenTask({ "task1": () => {},  "task2": () => {} });
    t.fail("should throw");
  } catch(e) {
    t.ok(e);
  }
});

test('listenTask() should give warning because missing task callback', function (t) {
  t.plan(1);
  const client = new testClient;
  const definition = { tasks: {"task1": {}, "task2": {}} };
  const service = newService(definition, client);
  const spy = sinon.spy(console, 'log');
  service.listenTask({ "task1": () => {} });
  t.equal(spy.getCall(0).args[0], 'WARNING: The following tasks described in the mesg.yml haven\'t been implemented: task2');
  spy.restore();
});

test('listenTask() should throw when called more than once', function (t) {
  t.plan(1);
  const client = new testClient;
  const definition = { tasks: {"task1": {}} };
  const service = newService(definition, client);
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
  const definition = { tasks: {'task1': {}, 'task2': {}} };
  const service = newService(definition, client);
  service.listenTask({ 'task1': () => {}, 'task2': () => {} });
  t.ok(spy.calledOnce);
  t.equal(spy.getCall(0).args[0].token, token);
  spy.restore();
});

test('listenTask() should handle tasks and submit result', function (t) {
  t.plan(6);
  const executionID = 'id';
  const inputData = {input: 'data'};
  const outputData = {output: 'data'};
  const client = new testClient;
  const definition = { tasks: {'task1': { outputs: { success: {} } }}};
  const service = newService(definition, client);
  const stream = <any>service.listenTask({ 'task1': (inputs, outputs) => {
    t.equal(inputData, inputData);
    t.ok(outputs.success);
    t.doesNotThrow(() => outputs.success(outputData))
  }});
  const spy = sinon.spy(client, 'submitResult');
  stream.emit('data', { executionID, taskKey: 'task1', inputData: JSON.stringify(inputData) });
  const args = spy.getCall(0).args[0];
  spy.restore();
  t.equal(args.executionID, executionID);
  t.equal(args.outputKey, 'success');
  t.equal(args.outputData, JSON.stringify(outputData));
});

test('output callback should throw when no data provided', function (t) {
  t.plan(1);
  const client = new testClient;
  const definition = { tasks: {'task1': { outputs: { success: {} } }}};
  const service = newService(definition, client);
  const stream = <any>service.listenTask({ 'task1': (inputs, outputs) => {
    try {
      (<any>outputs.success)()
    } catch(e) {
      t.equal(e.message, 'output callback requires object data')
    }
  }});
  stream.emit('data', {
    executionID: 'id',
    taskKey: 'task1',
    inputData: JSON.stringify({input: 'data'})
  });
});

test('emitEvent() should emit an event', function (t) {
  t.plan(3);
  const event = 'event1';
  const eventData = {event: 'data'};
  const client = new testClient;
  const definition = {};
  const service = newService(definition, client);
  const spy = sinon.spy(client, 'emitEvent');
  service.emitEvent(event, eventData);
  const args = spy.getCall(0).args[0];
  t.equal(args.token, token);
  t.equal(args.eventKey, event);
  t.equal(args.eventData, JSON.stringify(eventData));
  spy.restore();
});

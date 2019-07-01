import * as test from 'tape'
import * as sinon from 'sinon'
import Service from './service'
import Api, { API } from '../api/mock'

const token = "token"

function newService({
  definition = {},
  api = Api(''),
}: { definition?: any, api?: API }): Service {
  return new Service({
    token,
    definition,
    API: api
  })
}


test('listenTask() should pass task validation', function (t) {
  t.plan(1);
  const definition = { tasks: { "task1": {}, "task2": {} } };
  const service = newService({ definition });
  sinon.stub(service, 'listenTask');
  try {
    service.listenTask({ "task1": () => ({}), "task2": () => ({}) });
    t.pass("tasks valid");
  } catch (e) {
    t.error(e);
  }
});

test('listenTask() should throw because missing task in mesg.yml', function (t) {
  t.plan(1);
  const definition = { tasks: { "task1": {} } };
  const service = newService({ definition });
  try {
    service.listenTask({ "task1": () => ({}), "task2": () => ({}) });
    t.fail("should throw");
  } catch (e) {
    t.ok(e);
  }
});

test('listenTask() should give warning because missing task callback', function (t) {
  t.plan(1);
  const definition = { tasks: { "task1": {}, "task2": {} } };
  const service = newService({ definition });
  const spy = sinon.spy(console, 'warn');
  service.listenTask({ "task1": () => ({}) });
  t.equal(spy.getCall(0).args[0], 'WARNING: The following tasks described in the mesg.yml haven\'t been implemented: task2');
  spy.restore();
});

test('listenTask() should throw when called more than once', function (t) {
  t.plan(1);
  const definition = { tasks: { "task1": {} } };
  const service = newService({ definition });
  service.listenTask({ "task1": () => ({}) });
  try {
    service.listenTask({ "task1": () => ({}) });
    t.fail("should throw");
  } catch (e) {
    t.ok(e);
  }
});

test('listenTask() should listen for tasks', function (t) {
  t.plan(2);
  const api = Api('');
  const spy = sinon.spy(api.execution, 'stream');
  const definition = { tasks: { 'task1': {}, 'task2': {} } };
  const service = newService({ definition, api });
  service.listenTask({ 'task1': () => ({}), 'task2': () => ({}) });
  t.ok(spy.calledOnce);
  t.equal(spy.getCall(0).args[0].filter.instanceHash, token);
  spy.restore();
});

test('listenTask() should handle tasks and submit result', async function (t) {
  t.plan(4);
  const hash = 'hash';
  const inputs = { input: 'data' };
  const outputs = { output: 'data' };
  const api = Api('');
  const spy = sinon.spy(api.execution, 'update');
  const definition = { tasks: { 'task1': { inputs: {}, outputs: {} } } };
  const service = newService({ definition, api });
  const stream = <any>service.listenTask({
    'task1': (taskinputs) => {
      t.deepEqual(taskinputs, inputs);
      return outputs
    }
  });
  t.doesNotThrow(() => stream.emit('data', { hash, taskKey: 'task1', inputs: JSON.stringify(inputs) }));
  await setTimeout(() => { }, 0)
  const args = spy.getCall(0).args[0];
  spy.restore();
  t.equal(args.hash, hash);
  t.equal(args.outputs, JSON.stringify(outputs));
});

test('emitEvent() should emit an event', function (t) {
  t.plan(4);
  const key = 'event1';
  const data = { event: 'data' };
  const api = Api('');
  const spy = sinon.spy(api.event, 'create');
  const service = newService({ api });
  t.doesNotThrow(() => service.emitEvent(key, data));
  const args = spy.getCall(0).args[0];
  t.equal(args.event.instanceHash, token);
  t.equal(args.event.key, key);
  t.equal(args.event.data, JSON.stringify(data));
  spy.restore();
});

test('emitEvent() should throw when no data provided', function (t) {
  t.plan(1);
  const service = newService({});
  try {
    (<any>service.emitEvent)('event1')
  } catch (e) {
    t.equal(e.message, 'data object must be send while emitting event')
  }
});

import * as test from 'tape'
import * as sinon from 'sinon'
import * as isUUID from 'is-uuid'
import Application from './application';
import Api, { ExecutionStatus, streams } from '../api/mock'

test('listenEvent() should listen for events and return a stream', (t) => {
  t.plan(2);
  const api = Api('')
  const application = new Application(api);
  const spy = sinon.spy(api.event, 'Stream')
  application.listenEvent({ filter: { instanceHash: '1', key: '2' } })
  const req = spy.getCall(0).args[0]
  t.equal(req.filter.instanceHash, '1')
  t.equal(req.filter.key, '2')
  spy.restore()
});

test('listenResult() should listen for results and return a stream', (t) => {
  t.plan(2);
  const api = Api('');
  const application = new Application(api);
  const spy = sinon.spy(api.execution, 'Stream')
  application.listenResult({
    filter: {
      instanceHash: '1',
      statuses: [ExecutionStatus.COMPLETED]
    }
  })
  const req = spy.getCall(0).args[0]
  t.equal(req.filter.instanceHash, '1')
  t.equal(req.filter.statuses[0], ExecutionStatus.COMPLETED)
  spy.restore()
});

test('executeTask() should execute a task', (t) => {
  t.plan(4);
  const api = Api('');
  const application = new Application(api);
  const spy = sinon.spy(api.execution, 'Create')
  application.executeTask({
    instanceHash: '1',
    taskKey: '2',
    inputs: '3',
    tags: ['4', '5']
  })
  const req = spy.getCall(0).args[0]
  t.equal(req.instanceHash, '1')
  t.equal(req.taskKey, '2')
  t.equal(req.inputs, '3')
  t.same(req.tags, ['4', '5'])
  spy.restore()
});

test('executeTask() should resolve promise with reply', (t) => {
  t.plan(1);
  const api = Api('');
  const application = new Application(api);
  const reply = { hash: '1' }
  const stub = sinon.stub(api.execution, 'Create').callsFake(res => Promise.resolve(reply))
  application.executeTask({
    instanceHash: '2',
    taskKey: '3',
    inputs: '4'
  }).then(reply => t.equal(reply.hash, '1'))
  stub.restore()
});

test('executeTask() should reject promise with err', (t) => {
  t.plan(1);
  const api = Api('');
  const application = new Application(api);
  const stub = sinon.stub(api.execution, 'Create').callsFake(() => Promise.reject(new Error('1')))
  application.executeTask({
    instanceHash: '2',
    taskKey: '3',
    inputs: '4'
  }).catch((err) => t.equal(err.message, '1'))
  stub.restore()
});

test('executeTaskAndWaitResult() should listen for results', (t) => {
  t.plan(1);
  const api = Api('');
  const application = new Application(api);
  const spy = sinon.spy(api.execution, 'Stream')
  application.executeTaskAndWaitResult({ instanceHash: '1', taskKey: '2', inputs: '3' })
  const req = spy.getCall(0).args[0]
  t.equal(req.filter.instanceHash, '1')
  spy.restore()
});

test('executeTaskAndWaitResult() should reject and cancel result stream on `error` event', (t) => {
  t.plan(2);
  const api = Api('');
  const application = new Application(api);
  const spy = sinon.spy(streams.execution, 'cancel')
  application.executeTaskAndWaitResult({ instanceHash: '2', taskKey: '3', inputs: '4' })
    .catch((err) => t.equal(err, '1'))
  streams.execution.emit('error', '1')
  t.ok(spy.called)
  spy.restore()
});

test('executeTaskAndWaitResult() should resolve and cancel result stream on first `data` event', (t) => {
  t.plan(2);
  const api = Api('');
  const application = new Application(api);
  const spy = sinon.spy(streams.execution, 'cancel')
  application.executeTaskAndWaitResult({ instanceHash: '2', taskKey: '3', inputs: '4' })
    .then((result) => t.equal(result.hash, '2'))
  streams.execution.emit('data', { hash: '2' })
  t.ok(spy.called)
  spy.restore()
});

test('executeTaskAndWaitResult() should execute task', (t) => {
  t.plan(4);
  const api = Api('');
  const application = new Application(api);
  const spy = sinon.spy(api.execution, 'Create')
  application.executeTaskAndWaitResult({ instanceHash: '2', taskKey: '3', inputs: '4' })
  streams.execution.emit('metadata', { get() { return ['ready'] } })
  const req = spy.getCall(0).args[0]
  t.equal(req.instanceHash, '2')
  t.equal(req.taskKey, '3')
  t.equal(req.inputs, '4')
  t.ok(isUUID.v4(req.tags[0]))
  spy.restore()
});
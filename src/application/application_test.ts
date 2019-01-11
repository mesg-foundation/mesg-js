import * as test from 'tape'
import * as sinon from 'sinon'
import * as isUUID from 'is-uuid'
import { EventEmitter } from 'events';
import Application, {
  ListenEventRequest,
  ListenResultRequest,
  ExecuteTaskRequest,
  ExecuteTaskReply,
  ResultData
} from './application';

class testStream extends EventEmitter {
  cancel() { }
  destroy(err: Error) { }
}

class testClient {
  eventStream = new testStream
  resultStream = new testStream

  ListenEvent() { return this.eventStream }
  ListenResult() { return this.resultStream }
  ExecuteTask() { }
}

test('Application should expose the core gRPC api', (t) => {
  t.plan(1);
  const application = new Application({ client: new testClient });
  t.ok(application.api);
});

test('listenEvent() should listen for events and return a stream', (t) => {
  t.plan(3);
  const client = new testClient;
  const application = new Application({ client });
  const spy = sinon.spy(client, 'ListenEvent')
  const stream = application.listenEvent({ serviceID: '1', eventFilter: '2' })
  const req: ListenEventRequest = spy.getCall(0).args[0]
  t.ok(stream instanceof testStream)
  t.equal(req.serviceID, '1')
  t.equal(req.eventFilter, '2')
  spy.restore()
});

test('listenResult() should listen for results and return a stream', (t) => {
  t.plan(5);
  const client = new testClient;
  const application = new Application({ client });
  const spy = sinon.spy(client, 'ListenResult')
  const stream = application.listenResult({ 
    serviceID: '1',
    taskFilter: '2',
    outputFilter: '3',
    tagFilters: ['4', '5']
  })
  const req: ListenResultRequest = spy.getCall(0).args[0]
  t.ok(stream instanceof testStream)
  t.equal(req.serviceID, '1')
  t.equal(req.taskFilter, '2')
  t.equal(req.outputFilter, '3')
  t.same(req.tagFilters, ['4', '5'])
  spy.restore()
});

test('executeTask() should execute a task', (t) => {
  t.plan(4);
  const client = new testClient;
  const application = new Application({ client });
  const spy = sinon.spy(client, 'ExecuteTask')
  application.executeTask({
    serviceID: '1',
    taskKey: '2',
    inputData: '3',
    executionTags: ['4', '5']
  })
  const req: ExecuteTaskRequest = spy.getCall(0).args[0]
  t.equal(req.serviceID, '1')
  t.equal(req.taskKey, '2')
  t.equal(req.inputData, '3')
  t.same(req.executionTags, ['4', '5'])
  spy.restore()
});

test('executeTask() should resolve promise with reply', (t) => {
  t.plan(1);
  const client = new testClient;
  const application = new Application({ client });
  const reply: ExecuteTaskReply = { executionID: '1' }
  const stub = sinon.stub(client, 'ExecuteTask').callsFake((req, cb) => cb(undefined, reply))
  application.executeTask({
    serviceID: '2',
    taskKey: '3',
    inputData: '4'
  }).then((reply) =>  t.equal(reply.executionID, '1') )
  stub.restore()
});

test('executeTask() should reject promise with err', (t) => {
  t.plan(1);
  const client = new testClient;
  const application = new Application({ client });
  const stub = sinon.stub(client, 'ExecuteTask').callsFake((req, cb) => cb(new Error('1')))
  application.executeTask({
    serviceID: '2',
    taskKey: '3',
    inputData: '4'
  }).catch((err) =>  t.equal(err.message, '1') )
  stub.restore()
});

test('executeTaskAndWaitResult() should listen for results', (t) => {
  t.plan(2);
  const client = new testClient;
  const application = new Application({ client });
  const spy = sinon.spy(client, 'ListenResult')
  application.executeTaskAndWaitResult({ serviceID: '1',  taskKey: '2',  inputData: '3' })
  const req: ListenResultRequest = spy.getCall(0).args[0]
  t.equal(req.serviceID, '1')
  t.ok(isUUID.v4(req.tagFilters[0]))
  spy.restore()
});

test('executeTaskAndWaitResult() should reject and cancel result stream on `error` event', (t) => {
  t.plan(2);
  const client = new testClient;
  const application = new Application({ client });
  const spy = sinon.spy(client.resultStream, 'cancel')
  application.executeTaskAndWaitResult({ serviceID: '2',  taskKey: '3', inputData: '4' })
    .catch((err) => t.equal(err.message, '1'))
  client.resultStream.emit('error', new Error('1'))
  t.ok(spy.calledOnce)
  spy.restore()
});

test('executeTaskAndWaitResult() should resolve and cancel result stream on first `data` event', (t) => {
  t.plan(2);
  const client = new testClient;
  const application = new Application({ client });
  const spy = sinon.spy(client.resultStream, 'cancel')
  application.executeTaskAndWaitResult({  serviceID: '2', taskKey: '3', inputData: '4' })
    .then((result) => t.equal(result.executionID, '2'))
  client.resultStream.emit('data', { executionID: '2' })
  t.ok(spy.calledOnce)
  spy.restore()
});

test('executeTaskAndWaitResult() should execute task', (t) => {
  t.plan(4);
  const client = new testClient;
  const application = new Application({ client });
  const spy = sinon.spy(client, 'ExecuteTask')
  application.executeTaskAndWaitResult({  serviceID: '2', taskKey: '3', inputData: '4' })
  client.resultStream.emit('metadata', { get() { return ['ready'] } })
  const req: ExecuteTaskRequest = spy.getCall(0).args[0]
  t.equal(req.serviceID, '2')
  t.equal(req.taskKey, '3')
  t.equal(req.inputData, '4')
  t.ok(isUUID.v4(req.executionTags[0]))
  spy.restore()
});
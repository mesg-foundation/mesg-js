import * as test from 'tape'
import * as sinon from 'sinon'
import * as grpc from 'grpc'
import Application from '.';
import { EventEmitter } from 'events';
import { CoreClient } from '../client/api-core_grpc_pb'
import {
  ListenEventRequest as ListenEventRequestPB,
  ListenResultRequest as ListenResultRequestPB,
  ExecuteTaskRequest as ExecuteTaskRequestPB,
  ExecuteTaskReply as ExecuteTaskReplyPB
} from '../client/api-core_pb'

class testStream extends EventEmitter {
  cancel() {}
}

class testClient { 
  eventStream = new testStream
  resultStream = new testStream
  listenEvent(): EventEmitter { return this.eventStream }
  listenResult(): EventEmitter { return this.resultStream }
  executeTask(){}
}

function newApplication(client: testClient): Application {
  return new Application({
    client: client as any as CoreClient,
  })
}

test('Application should expose the core gRPC api', (t) => {
  t.plan(1);
  const application = new Application({
    client:  (new testClient) as any as CoreClient,
  });
  t.ok(<CoreClient>application.api);
});

test('listenEvent() should listen for MESG events', function (t) {
  t.plan(3);
  const client = new testClient();
  const application = newApplication(client);
  const spy = sinon.spy(client, 'listenEvent');
  application.listenEvent({ serviceID: '1', eventKey: '2' });
  t.ok(spy.calledOnce);
  const req: ListenEventRequestPB = spy.getCall(0).args[0];
  t.equal(req.getServiceid(), '1');
  t.equal(req.getEventfilter(), '2');
  spy.restore();
});

test('listenResult() should listen for MESG results', function (t) {
  t.plan(5);
  const client = new testClient();
  const application = newApplication(client);
  const spy = sinon.spy(client, 'listenResult');
  application.listenResult({ serviceID: '1',  taskKey: '2', outputKey: '3', tags: ['4', '5'] });
  t.ok(spy.calledOnce);
  const req: ListenResultRequestPB = spy.getCall(0).args[0];
  t.equal(req.getServiceid(), '1');
  t.equal(req.getTaskfilter(), '2');
  t.equal(req.getOutputfilter(), '3');
  t.same(req.getTagfiltersList(), ['4', '5']);
  spy.restore();
});

test('executeTask() should execute a MESG task', function (t) {
  t.plan(6);
  const client = new testClient();
  const application = newApplication(client);
  const spy = sinon.spy(client, 'executeTask');
  application.executeTask({ serviceID: '1', taskKey: '2', inputData: {"3": "b"}, tags: ['4', '5'] })
    .then((executionID) => { t.equal(executionID, '6') })
  t.ok(spy.calledOnce);
  const req: ExecuteTaskRequestPB = spy.getCall(0).args[0];
  const cb: Function = spy.getCall(0).args[1];
  t.equal(req.getServiceid(), '1');
  t.equal(req.getTaskkey(), '2');
  t.equal(req.getInputdata(), '{"3":"b"}');
  t.same(req.getExecutiontagsList(), ['4', '5']);
  cb(null, <ExecuteTaskReplyPB>{ getExecutionid() { return '6'} });
  spy.restore();
});

export {
  testClient,
  newApplication
}
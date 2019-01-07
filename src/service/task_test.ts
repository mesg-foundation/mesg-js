import * as test from 'tape'
import * as sinon from 'sinon'
import { TaskData } from '../client/api-service_pb'
import { testClient, newService } from './service_test';
import { Task } from './task';

test('listenTask() should emit `task` event', function (t) {
  t.plan(3);
  const client = new testClient();
  const service = newService({ tasks: {"task1": {}} }, client);
  const stream = service.listenTask({ "task1": () => {} });
  stream.on('task', (task: Task) => {
    t.equal(task.executionID, '1')
    t.equal(task.taskKey, 'task1')
    t.same(task.inputData, {"3": "a"})
  })
  client.taskStream.emit('data', <TaskData>{
    getExecutionid() { return '1' },
    getTaskkey() { return 'task1' },
    getInputdata() { return '{"3": "a"}' },
  });
});

test('listenTask() should emit `end` event without error', function (t) {
  t.plan(1);
  const client = new testClient();
  const service = newService({ tasks: {"task1": {}} }, client);
  const stream = service.listenTask({ "task1": () => {} });
  stream.on('end', (err) => { t.false(err) })
  client.taskStream.emit('end');
});
  
test('listenTask() should emit `end` event with error', function (t) {
  t.plan(1);
  const client = new testClient();
  const service = newService({ tasks: {"task1": {}} }, client);
  const stream = service.listenTask({ "task1": () => {} });
  stream.on('end', (err) => { t.same(err.message, '2') })
  client.taskStream.emit('error', new Error('2'));
});
  
test('listenTask() should cancel', function (t) {
  t.plan(1);
  const client = new testClient();
  const service = newService({ tasks: {"task1": {}} }, client);
  const spy = sinon.spy(client.taskStream, 'cancel');
  const stream = service.listenTask({ "task1": () => {} });
  stream.cancel();
  t.ok(spy.calledOnce);
  spy.restore();
});

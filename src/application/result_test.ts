import * as test from 'tape'
import * as sinon from 'sinon'
import { ResultData } from '../client/api-core_pb'
import { testClient, newApplication } from './application_test';
import { Result } from './result';

test('listenResult() should emit `result` event', function (t) {
  t.plan(6);
  const client = new testClient();
  const application = newApplication(client);
  const stream = application.listenResult('1');
  stream.on('result', (result: Result) => {
    t.equal(result.executionID, '2')
    t.equal(result.error, '3')
    t.equal(result.taskKey, '4')
    t.equal(result.outputKey, '5')
    t.same(result.outputData, {'6': 'a'})
    t.same(result.tags, ['7', '8'])
  })
  client.resultStream.emit('data', <ResultData>{
    getExecutionid() { return '2' },
    getError() { return '3' },
    getTaskkey() { return '4' },
    getOutputkey() { return '5' },
    getOutputdata() { return '{"6": "a"}' },
    getExecutiontagsList() { return ['7', '8'] },
  });
});

test('listenResult() should emit `end` event without error', function (t) {
  t.plan(1);
  const client = new testClient();
  const application = newApplication(client);
  const stream = application.listenResult('1');
  stream.on('end', (err) => { t.false(err) })
  client.resultStream.emit('end');
});
  
test('listenResult() should emit `end` event with error', function (t) {
  t.plan(1);
  const client = new testClient();
  const application = newApplication(client);
  const stream = application.listenResult('1');
  stream.on('end', (err) => { t.same(err.message, '2') })
  client.resultStream.emit('error', new Error('2'));
});
  
test('listenResult() should cancel', function (t) {
  t.plan(1);
  const client = new testClient();
  const application = newApplication(client);
  const spy = sinon.spy(client.resultStream, 'cancel');
  const stream = application.listenResult('1');
  stream.cancel();
  t.ok(spy.calledOnce);
  spy.restore();
});
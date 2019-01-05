import * as test from 'tape'
import * as sinon from 'sinon'
import { EventData } from '../client/api-core_pb'
import { testClient, newApplication } from './application_test';
import { Event } from './event';

test('listenEvent() should emit `event` event', function (t) {
  t.plan(2);
  const client = new testClient();
  const application = newApplication(client);
  const stream = application.listenEvent('1');
  stream.on('event', (event: Event) => {
    t.equal(event.key, '3')
    t.same(event.data, {"4": "a"})
  })
  client.eventStream.emit('data', <EventData>{
    getEventkey() { return '3' },
    getEventdata() { return '{"4": "a"}' },
  });
});

test('listenEvent() should emit `end` event without error', function (t) {
  t.plan(1);
  const client = new testClient();
  const application = newApplication(client);
  const stream = application.listenEvent('1');
  stream.on('end', (err) => { t.false(err) })
  client.eventStream.emit('end');
});
  
test('listenEvent() should emit `end` event with error', function (t) {
  t.plan(1);
  const client = new testClient();
  const application = newApplication(client);
  const stream = application.listenEvent('1');
  stream.on('end', (err) => { t.same(err.message, '2') })
  client.eventStream.emit('error', new Error('2'));
});
  
test('listenEvent() should cancel', function (t) {
  t.plan(1);
  const client = new testClient();
  const application = newApplication(client);
  const spy = sinon.spy(client.eventStream, 'cancel');
  const stream = application.listenEvent('1');
  stream.cancel();
  t.ok(spy.calledOnce);
  spy.restore();
});
import * as test from 'tape'
import * as sinon from 'sinon'
import { resolveSID } from './resolve'
import Api from '../api/mock'

const instances = [{ hash: Buffer.from('instancehash'), serviceHash: Buffer.from('servicehash') }]
const services = [{ hash: Buffer.from('servicehash'), sid: 'servicesid' }]

test('resolve service invalid', async function (t) {
  t.plan(1);
  const api = Api('')
  const sid = "invalid"
  sinon.stub(api.instance, 'get').callsFake(() => { throw new Error("not found") })
  sinon.stub(api.service, 'list').callsFake(() => (Promise.resolve({ services })))
  try {
    await resolveSID(api, sid)
  } catch (e) {
    t.ok(e)
  }
});

test('resolve service by sid', async function (t) {
  t.plan(1);
  const api = Api('')
  const sid = "servicesid"
  sinon.stub(api.instance, 'get').callsFake(() => { throw new Error("not found") })
  sinon.stub(api.service, 'list').callsFake(() => (Promise.resolve({ services })))
  sinon.stub(api.instance, 'list').callsFake(() => (Promise.resolve({ instances })))
  const instanceHash = await resolveSID(api, sid)
  t.equal(instanceHash, instances[0].hash)
});

test('resolve service by sid (multiple)', async function (t) {
  t.plan(1);
  const api = Api('')
  const sid = "multiplesid"
  sinon.stub(api.instance, 'get').callsFake(() => { throw new Error("not found") })
  sinon.stub(api.service, 'list').callsFake(() => (Promise.resolve({ services: [{ sid }, { sid }] })))
  try {
    await resolveSID(api, sid)
  } catch (e) {
    t.equal(e.message, "multiple services resolve multiplesid")
  }
});

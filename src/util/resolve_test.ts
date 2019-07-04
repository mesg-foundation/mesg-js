import * as test from 'tape'
import * as sinon from 'sinon'
import { resolveSID } from './resolve'
import Api from '../api/mock'

const instances = [{ hash: 'instancehash', serviceHash: 'servicehash' }]
const services = [{ hash: 'servicehash', sid: 'servicesid' }]

test('resolve service invalid', async function (t) {
  t.plan(1);
  const api = Api('')
  const hash = "invalid"
  sinon.stub(api.instance, 'get').callsFake(() => { throw new Error("not found") })
  sinon.stub(api.service, 'list').callsFake(() => ({ services }))
  try {
    await resolveSID(api, hash)
  } catch (e) {
    t.ok(e)
  }
});

test('resolve service by sid', async function (t) {
  t.plan(1);
  const api = Api('')
  const hash = "servicesid"
  sinon.stub(api.instance, 'get').callsFake(() => { throw new Error("not found") })
  sinon.stub(api.service, 'list').callsFake(() => ({ services }))
  sinon.stub(api.instance, 'list').callsFake(() => ({ instances }))
  const instanceHash = await resolveSID(api, hash)
  t.equal(instanceHash, instances[0].hash)
});
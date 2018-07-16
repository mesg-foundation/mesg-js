import * as test from 'tape'
import ClientBuilder from './client'

test('service() should successfully return', function (t) {
    t.plan(1);
    const service = new ClientBuilder({endpoint: ""}).service()
    t.ok(service);
});

test('core() should successfully return', function (t) {
    t.plan(1);
    const core = new ClientBuilder({endpoint: ""}).core()
    t.ok(core);
});
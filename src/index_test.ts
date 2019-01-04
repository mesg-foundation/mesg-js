import * as test from 'tape'
import * as sinon from 'sinon'
import * as fs from 'fs'
import Service from './service'
import Application from './application';
import { service, application } from './'

test('multiple calls on service() should return the same Service instance', function (t) {
    t.plan(3);
    const stub = sinon.stub(fs, 'readFileSync');
    const stub1 = sinon.spy(() => sinon.createStubInstance(Service));
    t.ok(service() instanceof Service);
    service()
    t.ok(stub.calledOnce);
    t.ok(stub1.calledWithNew);
    stub.restore();
});

test('multiple calls on application() should return the same Application instance', function (t) {
    t.plan(2);
    const stub = sinon.spy(() => sinon.createStubInstance(Application));
    t.ok(application() instanceof Application);
    application()
    t.ok(stub.calledWithNew);
});
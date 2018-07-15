import * as test from 'tape'
import * as sinon from 'sinon'
import * as fs from 'fs'
import ClientBuilder from './client'
import Service from './service'
import Application from './application';
import { service, application } from './'

test('multiple calls on service() should return the same Service instance', function (t) {
    t.plan(2);
    const stub = sinon.stub(fs, 'readFileSync');
    const stub1 = sinon.stub(ClientBuilder.prototype, 'service');
    t.ok(service() instanceof Service);
    service()
    t.ok(stub.calledOnce);
    stub.restore();
    stub1.restore();
});

test('multiple calls on application() should return the same Application instance', function (t) {
    t.plan(2);
    const stub = sinon.stub(ClientBuilder.prototype, 'core');
    t.ok(application() instanceof Application);
    application()
    t.ok(stub.calledOnce);
    stub.restore();
});
import * as test from 'tape'
import { handleAPIResponse, checkStreamReady } from './api'

test('handleAPIResponse() reject', function (t) {
    t.plan(1);
    const error = {error: "detail"};
    const promise = new Promise((resolve, reject) => {
        handleAPIResponse(resolve, reject)(error, null);
    }).then(() => {
        t.fail("should reject");
    }).catch((e) => {
        t.equal(e, error)
    });
});

test('handleAPIResponse() resolve', function (t) {
    t.plan(1);
    const data = {data: "detail"};
    const promise = new Promise((resolve, reject) => {
        handleAPIResponse(resolve, reject)(null, data);
    }).then((d) => {
        t.equal(d, data)
    }).catch(() => {
        t.fail("should resolve");
    });
});

test('checkStreamReady() without error', function (t) {
    t.plan(2);
    t.false(checkStreamReady({
        get(key) {
            t.equal(key, 'status')
            return ['x', 'ready']
        }
    }))
});

test('checkStreamReady() with empty statuses', function (t) {
    t.plan(1);
    t.equal(checkStreamReady({
        get(key) { return [] }
    }).message, 'stream header does not contain any status')
});

test('checkStreamReady() without having ready status', function (t) {
    t.plan(1);
    t.equal(checkStreamReady({
        get(key) { return ['x'] }
    }).message, `stream header status is different than ready. Got x`)
});

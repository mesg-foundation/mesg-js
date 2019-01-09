import * as test from 'tape'
import { checkStreamReady } from './grpc'

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
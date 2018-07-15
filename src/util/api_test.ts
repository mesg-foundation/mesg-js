import * as test from 'tape'
import { handleAPIResponse } from './api'

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

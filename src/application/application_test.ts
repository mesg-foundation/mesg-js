import * as test from 'tape'
import * as sinon from 'sinon'
import * as clone from 'clone'
import { CoreClient } from '../client'
import Application from '.';
import { EventEmitter } from 'events';

class testClient { }

test('Application should expose the core gRPC api', (t) => {
    t.plan(1);
    const application = new Application({
        client:  (new testClient) as any as CoreClient,
    });
    t.ok(<CoreClient>application.api);
});
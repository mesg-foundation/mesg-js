import * as test from 'tape'
import { CoreClient } from '../client/api-core_grpc_pb'
import Application from '.';

class testClient { }

test('Application should expose the core gRPC api', (t) => {
    t.plan(1);
    const application = new Application({
        client:  (new testClient) as any as CoreClient,
    });
    t.ok(<CoreClient>application.api);
});
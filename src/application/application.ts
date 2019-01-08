import { CoreClient } from '../client/api-core_grpc_pb';

type Options = {
    client: CoreClient
}

class Application {
    // api gives access to low level gRPC calls.
    api: CoreClient

    constructor(options: Options){
        this.api = options.client;
    }
}

export default Application;
export {
    Options,
}

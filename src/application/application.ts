import { Stream } from '../client/stream';
import { handleAPIResponse } from '../util/api';
import { 
    EventData,
    ResultData, 
    ExecuteTaskReply, 
    StartServiceReply
} from '../client/core-client';

type Options = {
    client
}

class Application {
    // api gives access to low level gRPC calls.
    api

    constructor(options: Options){
        this.api = options.client;
    }
}

export default Application;
export {
    Options,
}

import { handleAPIResponse } from '../util/api';

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

declare interface Stream<T> {
    on(event: 'data', listener: (data: T) => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (e) => void): this;
    on(event: 'status', listener: (status) => void): this;
}

export default Application;
export {
    Options,
    Stream
}

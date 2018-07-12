import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
 
import * as path from 'path'
import ServiceClient from './service-client'
import CoreClient from './core-client'

type Options = {
    endpoint: string
}

class ClientBuilder {
    private options: Options;

    constructor(options: Options){
        this.options = options;
    }

    service(): ServiceClient {
        const packageDefinition = protoLoader.loadSync(path.join(__dirname, './proto/api-service.proto'));
        const packageObject = grpc.loadPackageDefinition(packageDefinition);
      
        const clientConstructor = packageObject.api.Service;
        return <ServiceClient>new clientConstructor(
            this.options.endpoint,
            grpc.credentials.createInsecure()
        )
    }

    core(): CoreClient {
        const packageDefinition = protoLoader.loadSync(path.join(__dirname, './proto/api-core.proto'));
        const packageObject = grpc.loadPackageDefinition(packageDefinition);
        
        const clientConstructor = packageObject.api.Core;
        return <CoreClient>new clientConstructor(
            this.options.endpoint,
            grpc.credentials.createInsecure()
        )
    }
}

export default ClientBuilder;
import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import * as path from 'path'
import * as fs from 'fs'
import * as YAML from 'js-yaml'
import Service from './service'
import Application from './application'

const token = process.env.MESG_TOKEN;
const ymlPath = './mesg.yml';
const defaultEndpoint = process.env.MESG_ENDPOINT || 'localhost:50052';

var defaultService: Service
var defaultApplication: Application

const service = () => {
  if (!defaultService) {
    const mesgConfig = YAML.safeLoad(fs.readFileSync(ymlPath));

    defaultService = new Service({
      token: token,
      mesgConfig: mesgConfig,
      client: createClient('Service', 'api-service.proto', defaultEndpoint)
    });
  }

  return defaultService;
}

type ApplicationOptions = {
  endpoint?: string
}

const application = (options?: ApplicationOptions) => {
  if (!defaultApplication){
    const endpoint = options && options.endpoint ? options.endpoint: defaultEndpoint;
    defaultApplication = new Application({
      client: createClient('Core', 'api-core.proto', endpoint)
    });
  }

  return defaultApplication;
}

function createClient(serviceName: string, filePath: string, endpoint: string){
  const packageDefinition = protoLoader.loadSync(path.join(__dirname, 'client/proto', filePath));
  const packageObject = grpc.loadPackageDefinition(packageDefinition);

  const clientConstructor = packageObject.api[serviceName];
  return new clientConstructor(
    endpoint,
    grpc.credentials.createInsecure()
  )
}

export {
  service,
  application
}
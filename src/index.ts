import { ServiceClient } from './client/api-service_grpc_pb'
import { CoreClient } from './client/api-core_grpc_pb'
import * as CoreTypes from './client/api-core_pb'
import Service from './service'
import Application from './application'
import * as grpc from 'grpc'
import * as fs from 'fs'
import * as YAML from 'js-yaml'

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
      client: new ServiceClient(defaultEndpoint, grpc.credentials.createInsecure()),
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
      client: new CoreClient(endpoint, grpc.credentials.createInsecure())
    });
  }

  return defaultApplication;
}

export {
  service,
  application,
  ApplicationOptions,
  CoreTypes
}
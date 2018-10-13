import { ServiceClient } from './client/api-service_pb_service'
import { CoreClient } from './client/api-core_pb_service';
import Service from './service'
import Application from './application'
import * as fs from 'fs'
import * as YAML from 'js-yaml'

const token = process.env.MESG_TOKEN;
const ymlPath = './mesg.yml';
const endpoint = process.env.MESG_ENDPOINT || 'localhost:50052';
const endpointTCP = process.env.MESG_ENDPOINT_TCP;

var defaultService: Service
var defaultApplication: Application

const service = () => {
  if (!defaultService) {
    const mesgConfig = YAML.safeLoad(fs.readFileSync(ymlPath));

    defaultService = new Service({
      token: token,
      mesgConfig: mesgConfig,
      client: new ServiceClient(endpointTCP),
    });
  }

  return defaultService;
}

const application = () => {
  if(!defaultApplication){
    defaultApplication = new Application({
      client: new CoreClient(endpoint)
    });
  }

  return defaultApplication;
}

export {
  service,
  application
}
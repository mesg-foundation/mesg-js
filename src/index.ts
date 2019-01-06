import ClientBuilder from './client'
import Service from './service'
import Application from './application'
import * as fs from 'fs'
import * as YAML from 'js-yaml'

const token = process.env.MESG_TOKEN;
const ymlPath = './mesg.yml';
const defaultEndpoint = process.env.MESG_ENDPOINT || 'localhost:50052';
const defaultEndpointTCP = process.env.MESG_ENDPOINT_TCP || '';

var defaultService: Service
var defaultApplication: Application

const service = () => {
  if (!defaultService) {
    const mesgConfig = YAML.safeLoad(fs.readFileSync(ymlPath));

    defaultService = new Service({
      token: token,
      mesgConfig: mesgConfig,
      client: new ClientBuilder({
        endpoint: defaultEndpointTCP,
      }).service(),
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
      client: new ClientBuilder({
        endpoint: endpoint,
      }).core(),
    });
  }

  return defaultApplication;
}

export {
  service,
  application
}
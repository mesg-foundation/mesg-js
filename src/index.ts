import ClientBuilder from './client'
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
      client: new ClientBuilder({
        endpoint: endpointTCP,
      }).service(),
    });
  }

  return defaultService;
}

const application = () => {
  if(!defaultApplication){
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
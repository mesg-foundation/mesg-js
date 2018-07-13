import ClientBuilder from './client'
import Service from './service'
import Application from './application'
import * as fs from 'fs'
import * as YAML from 'js-yaml'

const token = process.env.MESG_TOKEN;
const ymlPath = './mesg.yml';
const endpoint = process.env.MESG_ENDPOINT || 'localhost:50052';
const endpointTCP = process.env.MESG_ENDPOINT_TCP;

const service = () => {
  const mesgConfig = YAML.safeLoad(fs.readFileSync(ymlPath));

  return new Service({
    token: token,
    mesgConfig: mesgConfig,
    client: new ClientBuilder({
      endpoint: endpointTCP,
    }).service(),
  });
}

const application = () => {
  return new Application({
    client: new ClientBuilder({
      endpoint: endpoint,
    }).core(),
  });
}

export {
  service,
  application
}
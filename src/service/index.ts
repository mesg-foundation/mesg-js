import * as YAML from 'js-yaml'
import * as fs from 'fs'
import Service from './service'
import { createClient } from '../util/grpc'

const token = process.env.MESG_TOKEN
const endpoint = process.env.MESG_ENDPOINT
const ymlPath = './mesg.yml'

const serviceBuilder = (): Service => {
	const definition = YAML.safeLoad(fs.readFileSync(ymlPath));
	return new Service({
		token: token,
		definition: definition,
		client: createClient('Service', 'api-service.proto', endpoint)
	});
}

export default serviceBuilder;

export {
  Service
}

export {
	Tasks,
	TaskInputs,
	TaskOutputs,
	TaskOutputCallbackInput,
	Stream,
	EmitEventReply,
	SubmitResultReply,
	TaskData
} from './service'
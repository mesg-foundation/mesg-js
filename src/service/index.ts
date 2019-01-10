import * as YAML from 'js-yaml'
import * as fs from 'fs'
import Service from './service'
import { createClient } from '../util/grpc'

const token = process.env.MESG_TOKEN
const endpoint = process.env.MESG_ENDPOINT
const ymlPath = './mesg.yml'

var defaultService: Service

const serviceBuilder = () => {
	if (!defaultService) {
		const mesgConfig = YAML.safeLoad(fs.readFileSync(ymlPath));

		defaultService = new Service({
			token: token,
			mesgConfig: mesgConfig,
			client: createClient('Service', 'api-service.proto', endpoint)
		});
	}

	return defaultService;
}

export default serviceBuilder;
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
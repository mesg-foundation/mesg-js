import Application from './application'
import { createClient } from '../util/grpc'

const defaultEndpoint = process.env.MESG_ENDPOINT

var defaultApplication: Application

type Options = {
  endpoint?: string
}

const applicationBuilder = (options?: Options) => {
	if (!defaultApplication){
		const endpoint = options && options.endpoint ? options.endpoint: defaultEndpoint;
		defaultApplication = new Application({
			client: createClient('Core', 'api-core.proto', endpoint)
		});
	}

	return defaultApplication;
}

export default applicationBuilder;
export { Options }
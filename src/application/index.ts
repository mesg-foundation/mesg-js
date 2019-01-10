import Application from './application'
import { createClient } from '../util/grpc'

const defaultEndpoint = 'localhost:50052'

type Options = {
  endpoint?: string
}

const applicationBuilder = (options?: Options): Application => {
	const endpoint = options && options.endpoint ? options.endpoint: defaultEndpoint;
	return new Application({
		client: createClient('Core', 'api-core.proto', endpoint)
	});
}

export default applicationBuilder;
export { Options }
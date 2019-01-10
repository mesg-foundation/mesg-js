import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import * as path from 'path'

function createClient(serviceName: string, filePath: string, endpoint: string){
	const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../proto', filePath));
	const packageObject = grpc.loadPackageDefinition(packageDefinition);

	const clientConstructor = packageObject.api[serviceName];
	return new clientConstructor(
		endpoint,
		grpc.credentials.createInsecure()
	)
}

const statusKey = 'status'
const statusReady = 'ready'

// checkStreamReady checks if MESG's gRPC stream is ready to serve data.
// if not, it returns a non-empty error.
const checkStreamReady = (metadata): Error => {
	const statuses = metadata.get(statusKey)
	if (!statuses.length) {
		return new Error('stream header does not contain any status')
	}
	const lastStatus = statuses[statuses.length-1]
	if (lastStatus != statusReady) {
		return new Error(`stream header status is different than ready. Got ${lastStatus}`)
	}
}

export {
	createClient,
	checkStreamReady
}
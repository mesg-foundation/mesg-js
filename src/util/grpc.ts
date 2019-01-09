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

export {
  createClient
}
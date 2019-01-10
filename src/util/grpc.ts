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
const errNoStatus = new Error('stream header does not contain any status')

// checkStreamReady checks if MESG's gRPC stream is ready to serve data.
// if not, it returns a non-empty error.
const checkStreamReady = (metadata: Metadata): Error => {
	const statuses = metadata.get(statusKey)
	if (!statuses.length) {
		return errNoStatus
	}
	const lastStatus = statuses[statuses.length-1]
	if (lastStatus != statusReady) {
		return new Error(`stream header status is different than ready. Got ${lastStatus}`)
	}
}

// Stream is a type for gRPC ClientReadableStream but only covers a
// subset of its APIs.
interface Stream<T> {
    on(event: 'data', listener: (data: T) => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'status', listener: (status: Status) => void): this;
    on(event: 'metadata', listener: (metadata: Metadata) => void): this;
    cancel(): void;
    destroy(err?: Error): void;
}

// Metadata is a type for gRPC Metadata but only covers a subset of it
// for reading metadata on Stream.
interface Metadata {
	get(key: string): Array<string|Buffer>
}

// Status is a type for gRPC Status.
interface Status {
	code: number
	details: string
	metadata: Metadata
}

export {
	createClient,
	checkStreamReady,
	errNoStatus,
	Stream
}
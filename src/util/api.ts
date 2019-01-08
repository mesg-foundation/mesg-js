const handleAPIResponse = (resolve, reject) => (err, res) => {
	err ? reject(err)
			: resolve(res);
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
	handleAPIResponse,
	checkStreamReady
}

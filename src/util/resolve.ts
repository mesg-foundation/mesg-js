import { hash, API, Instance } from "../api";

const _resolutionTable: Map<string, hash> = new Map()

// findInstanceFromService returns an instance of a service with the following strategy:
//   - find a service that has the same hash than the serviceID
//   - find a service that has the same sid than the serviceID (only if there is no match for the hash)
//   - get all the instances of this service
//   - return the instance of the service and throw an error if there is other than one instance running
const findInstanceFromService = async (api: API, serviceID: string): Promise<Instance> => {
  const { services } = await api.service.list({})
  // Find by hash then by sid
  const service = services.find(x => x.hash === serviceID) || services.find(x => x.sid === serviceID)
  if (!service) throw new Error(`cannot resolve ${serviceID}`)

  // find matching instances
  const { instances } = await api.instance.list({ serviceHash: service.hash })
  if (!instances || instances.length === 0) throw new Error(`no instances running for the service ${service.sid}`)
  if (instances.length > 1) throw new Error(`multiple instances running for the service ${service.sid}`)
  return instances[0]
}

// resolveInstanceHash
// Return the instance hash based on a serviceID that can be:
//   - instanceHash
//   - sid
//   - serviceHash
// Throw an error if a serviceID has multiple instances running
// Warning: this function is making multiple requests to the Engine so not really efficient.
// it needs to be used carefully
export const resolveInstanceHash = async (api: API, serviceID: string): Promise<hash> => {
  if (_resolutionTable.has(serviceID)) return _resolutionTable.get(serviceID)

  try {
    const instance = await api.instance.get({ hash: serviceID })
    _resolutionTable.set(serviceID, instance.hash)
  } catch (e) {
    const instance = await findInstanceFromService(api, serviceID)
    _resolutionTable.set(serviceID, instance.hash)
  }
  return _resolutionTable.get(serviceID)
}
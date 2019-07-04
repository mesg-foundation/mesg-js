import { hash, API } from "../api";

const _resolutionTable: Map<string, hash> = new Map()

// returns an instanceHash based on an sid
// throw an error if the sid doesn't exists or have if it has more or less than one instance running
export const resolveSID = async (api: API, sid: string): Promise<hash> => {
  if (_resolutionTable.has(sid)) return _resolutionTable.get(sid)

  const { services } = await api.service.list({})
  const service = services.find(x => x.sid === sid)
  if (!service) throw new Error(`cannot resolve ${sid}`)

  // find matching instances
  const { instances } = await api.instance.list({ serviceHash: service.hash })
  if (!instances || instances.length === 0) throw new Error(`no instances running for the service ${service.sid}`)
  if (instances.length > 1) throw new Error(`multiple instances running for the service ${service.sid}`)

  _resolutionTable.set(sid, instances[0].hash)
  return _resolutionTable.get(sid)
}
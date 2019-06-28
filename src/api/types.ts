import { Stream } from '../util/grpc'

export type JSONString = string
export type hash = string

export type Event = {
  hash?: hash
  instanceHash: string
  key: string
  data: string
}

export enum ExecutionStatus {
  UNKNOWN = 0,
  CREATED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  FAILED = 4,
}
export type Execution = {
  hash?: hash
  parentHash: hash
  eventID: string
  status: ExecutionStatus
  instanceHash: string
  taskKey: string
  inputs: JSONString
  outputs?: JSONString
  error?: string
  tags?: string[]
}

export type Instance = {
  hash?: hash
  serviceHash: hash
}

export type Service = {
  hash?: hash
  sid: string
  name?: string
  description?: string
  configuration?: any
  tasks?: any[]
  events?: any[]
  dependencies?: any[]
  repository?: string
  source: string
}

export type EventCreateInputs = Event
export type EventCreateOutputs = { hash: hash }

export type EventStreamInputs = { filter?: { hash?: string, instanceHash?: string, key?: string } }
export type EventStreamOutputs = Stream<Event>

export type ExecutionGetInputs = { hash: hash }
export type ExecutionGetOutputs = Execution

export type ExecutionStreamInputs = { filter?: { statuses?: ExecutionStatus[], instanceHash?: hash, taskKey?: string, tags?: string[] } }
export type ExecutionStreamOutputs = Stream<Execution>

export type ExecutionCreateInputs = { instanceHash: hash, taskKey: string, inputs: JSONString, tags?: string[] }
export type ExecutionCreateOutputs = { hash: hash }

export type ExecutionUpdateInputs = { hash: hash, outputs?: JSONString, error?: string }
export type ExecutionUpdateOutputs = {}

export type InstanceGetInputs = { hash: hash }
export type InstanceGetOutputs = Instance

export type InstanceListInputs = { serviceHash?: hash }
export type InstanceListOutputs = { instances: Instance[] }

export type InstanceCreateInputs = { serviceHash: hash, env?: string[] }
export type InstanceCreateOutputs = { hash: hash }

export type InstanceDeleteInputs = { hash: hash, deleteDate?: boolean }
export type InstanceDeleteOutputs = {}

export type ServiceGetInputs = { hash: hash }
export type ServiceGetOutputs = Service

export type ServiceListInputs = {}
export type ServiceListOutputs = { services: Service[] }

export type ServiceCreateInputs = Service
export type ServiceCreateOutputs = { hash: hash }

export type ServiceDeleteInputs = { hash: hash }
export type ServiceDeleteOutputs = {}

type callback<T> = (err: Error, data: T) => void

export type API = {
  event: {
    Create: (request: EventCreateInputs, callback: callback<EventCreateOutputs>) => void
    Stream: (request: EventStreamInputs) => EventStreamOutputs
  }
  execution: {
    Get: (request: ExecutionGetInputs, callback: callback<ExecutionGetOutputs>) => void
    Stream: (request: ExecutionStreamInputs) => ExecutionStreamOutputs
    Create: (request: ExecutionCreateInputs, callback: callback<ExecutionCreateOutputs>) => void
    Update: (request: ExecutionUpdateInputs, callback: callback<ExecutionUpdateOutputs>) => void
  }
  instance: {
    Get: (request: InstanceGetInputs, callback: callback<InstanceGetOutputs>) => void
    List: (request: InstanceListInputs, callback: callback<InstanceListOutputs>) => void
    Create: (request: InstanceCreateInputs, callback: callback<InstanceCreateOutputs>) => void
    Delete: (request: InstanceDeleteInputs, callback: callback<InstanceDeleteOutputs>) => void
  }
  service: {
    Get: (request: ServiceGetInputs, callback: callback<ServiceGetOutputs>) => void
    List: (request: ServiceListInputs, callback: callback<ServiceListOutputs>) => void
    Create: (request: ServiceCreateInputs, callback: callback<ServiceCreateOutputs>) => void
    Delete: (request: ServiceDeleteInputs, callback: callback<ServiceDeleteOutputs>) => void
  }
}
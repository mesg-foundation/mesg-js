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
export type EventCreateOutputs = Promise<{ hash: hash }>

export type EventStreamInputs = { filter?: { hash?: string, instanceHash?: string, key?: string } }
export type EventStreamOutputs = Stream<Event>

export type ExecutionGetInputs = { hash: hash }
export type ExecutionGetOutputs = Promise<Execution>

export type ExecutionStreamInputs = { filter?: { statuses?: ExecutionStatus[], instanceHash?: hash, taskKey?: string, tags?: string[] } }
export type ExecutionStreamOutputs = Stream<Execution>

export type ExecutionCreateInputs = { instanceHash: hash, taskKey: string, inputs: JSONString, tags?: string[] }
export type ExecutionCreateOutputs = Promise<{ hash: hash }>

export type ExecutionUpdateInputs = { hash: hash, outputs?: JSONString, error?: string }
export type ExecutionUpdateOutputs = Promise<{}>

export type InstanceGetInputs = { hash: hash }
export type InstanceGetOutputs = Promise<Instance>

export type InstanceListInputs = { serviceHash?: hash }
export type InstanceListOutputs = Promise<{ instances: Instance[] }>

export type InstanceCreateInputs = { serviceHash: hash, env?: string[] }
export type InstanceCreateOutputs = Promise<{ hash: hash }>

export type InstanceDeleteInputs = { hash: hash, deleteDate?: boolean }
export type InstanceDeleteOutputs = Promise<{}>

export type ServiceGetInputs = { hash: hash }
export type ServiceGetOutputs = Promise<Service>

export type ServiceListInputs = {}
export type ServiceListOutputs = Promise<{ services: Service[] }>

export type ServiceCreateInputs = Service
export type ServiceCreateOutputs = Promise<{ hash: hash }>

export type ServiceDeleteInputs = { hash: hash }
export type ServiceDeleteOutputs = Promise<{}>

export type API = {
  event: {
    Create: (request: EventCreateInputs) => EventCreateOutputs
    Stream: (request: EventStreamInputs) => EventStreamOutputs
  }
  execution: {
    Get: (request: ExecutionGetInputs) => ExecutionGetOutputs
    Stream: (request: ExecutionStreamInputs) => ExecutionStreamOutputs
    Create: (request: ExecutionCreateInputs) => ExecutionCreateOutputs
    Update: (request: ExecutionUpdateInputs) => ExecutionUpdateOutputs
  }
  instance: {
    Get: (request: InstanceGetInputs) => InstanceGetOutputs
    List: (request: InstanceListInputs) => InstanceListOutputs
    Create: (request: InstanceCreateInputs) => InstanceCreateOutputs
    Delete: (request: InstanceDeleteInputs) => InstanceDeleteOutputs
  }
  service: {
    Get: (request: ServiceGetInputs) => ServiceGetOutputs
    List: (request: ServiceListInputs) => ServiceListOutputs
    Create: (request: ServiceCreateInputs) => ServiceCreateOutputs
    Delete: (request: ServiceDeleteInputs) => ServiceDeleteOutputs
  }
}
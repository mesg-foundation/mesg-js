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
  eventHash: hash
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
  configuration?: ServiceConfiguration
  tasks?: ServiceTask[]
  events?: ServiceEvent[]
  dependencies?: ServiceDependency[]
  repository?: string
  source: string
}

export type ServiceConfiguration = any // TODO
export type ServiceTask = any // TODO
export type ServiceEvent = any // TODO
export type ServiceDependency = any // TODO

export type EventCreateInputs = {
  instanceHash: string
  key: string
  data: JSONString
}
export type EventCreateOutputs = Promise<{ hash: hash }>

export type EventStreamInputs = { filter?: { hash?: string, instanceHash?: string, key?: string } }
export type EventStreamOutputs = Stream<Event>

export type ExecutionGetInputs = { hash: hash }
export type ExecutionGetOutputs = Promise<Execution>

export type ExecutionStreamInputs = { filter?: { statuses?: ExecutionStatus[], instanceHash?: hash, taskKey?: string, tags?: string[] } }
export type ExecutionStreamOutputs = Stream<Execution>

export type ExecutionCreateInputs = {
  instanceHash: hash,
  taskKey: string,
  inputs: JSONString,
  tags?: string[]
}
export type ExecutionCreateOutputs = Promise<{ hash: hash }>

export type ExecutionUpdateInputs = { hash: hash, outputs?: JSONString, error?: string }
export type ExecutionUpdateOutputs = Promise<{}>

export type InstanceGetInputs = { hash: hash }
export type InstanceGetOutputs = Promise<Instance>

export type InstanceListInputs = { serviceHash?: hash }
export type InstanceListOutputs = Promise<{ instances: Instance[] }>

export type InstanceCreateInputs = {
  serviceHash: hash,
  env?: string[]
}
export type InstanceCreateOutputs = Promise<{ hash: hash }>

export type InstanceDeleteInputs = { hash: hash, deleteData?: boolean }
export type InstanceDeleteOutputs = Promise<{}>

export type ServiceGetInputs = { hash: hash }
export type ServiceGetOutputs = Promise<Service>

export type ServiceListInputs = {}
export type ServiceListOutputs = Promise<{ services: Service[] }>

export type ServiceCreateInputs = {
  sid: string,
  name: string,
  description: string,
  configuration: ServiceConfiguration,
  tasks: ServiceTask[],
  events: ServiceEvent[],
  dependencies: ServiceDependency[],
  repository: string,
  source: string
}
export type ServiceCreateOutputs = Promise<{ hash: hash }>

export type ServiceDeleteInputs = { hash: hash }
export type ServiceDeleteOutputs = Promise<{}>

export type InfoOutputs = Promise<{ version: string, services: { sid: string, hash: hash, url: string, key: string }[] }>

export type API = {
  event: {
    create: (request: EventCreateInputs) => EventCreateOutputs
    stream: (request: EventStreamInputs) => EventStreamOutputs
  }
  execution: {
    get: (request: ExecutionGetInputs) => ExecutionGetOutputs
    stream: (request: ExecutionStreamInputs) => ExecutionStreamOutputs
    create: (request: ExecutionCreateInputs) => ExecutionCreateOutputs
    update: (request: ExecutionUpdateInputs) => ExecutionUpdateOutputs
  }
  instance: {
    get: (request: InstanceGetInputs) => InstanceGetOutputs
    list: (request: InstanceListInputs) => InstanceListOutputs
    create: (request: InstanceCreateInputs) => InstanceCreateOutputs
    delete: (request: InstanceDeleteInputs) => InstanceDeleteOutputs
  }
  service: {
    get: (request: ServiceGetInputs) => ServiceGetOutputs
    list: (request: ServiceListInputs) => ServiceListOutputs
    create: (request: ServiceCreateInputs) => ServiceCreateOutputs
    delete: (request: ServiceDeleteInputs) => ServiceDeleteOutputs
  },
  core: {
    info: () => InfoOutputs
  }
}
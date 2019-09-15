import { Stream } from '../util/grpc'
import * as EventType from './typedef/event'
import * as ExecutionType from './typedef/execution'
import * as InstanceType from './typedef/instance'
import * as ServiceType from './typedef/service'
import * as ProcessType from './typedef/process'

export type hash = Uint8Array

export const ExecutionStatus = {
  UNKNOWN: 0,
  CREATED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  FAILED: 4
}

export type Event = EventType.mesg.types.IEvent

export type Execution = ExecutionType.mesg.types.IExecution

export type Instance = InstanceType.mesg.types.IInstance

export type Service = ServiceType.mesg.types.IService

export type Process = ProcessType.mesg.types.IProcess

export type EventCreateInputs = EventType.mesg.api.ICreateEventRequest
export type EventCreateOutputs = Promise<EventType.mesg.api.ICreateEventResponse>

export type EventStreamInputs = EventType.mesg.api.StreamEventRequest
export type EventStreamOutputs = Stream<Event>

export type ExecutionGetInputs = ExecutionType.mesg.api.IGetExecutionRequest
export type ExecutionGetOutputs = Promise<Execution>

export type ExecutionStreamInputs = ExecutionType.mesg.api.IStreamExecutionRequest
export type ExecutionStreamOutputs = Stream<Execution>

export type ExecutionCreateInputs = ExecutionType.mesg.api.ICreateExecutionRequest
export type ExecutionCreateOutputs = Promise<ExecutionType.mesg.api.ICreateExecutionResponse>

export type ExecutionUpdateInputs = ExecutionType.mesg.api.IUpdateExecutionRequest
export type ExecutionUpdateOutputs = Promise<ExecutionType.mesg.api.IUpdateExecutionResponse>

export type InstanceGetInputs = InstanceType.mesg.api.IGetInstanceRequest
export type InstanceGetOutputs = Promise<Instance>

export type InstanceListInputs = InstanceType.mesg.api.IListInstancesRequest
export type InstanceListOutputs = Promise<InstanceType.mesg.api.IListInstancesResponse>

export type InstanceCreateInputs = InstanceType.mesg.api.ICreateInstanceRequest
export type InstanceCreateOutputs = Promise<InstanceType.mesg.api.ICreateInstanceResponse>

export type InstanceDeleteInputs = InstanceType.mesg.api.IDeleteInstanceRequest
export type InstanceDeleteOutputs = Promise<InstanceType.mesg.api.IDeleteInstanceResponse>

export type ServiceGetInputs = ServiceType.mesg.api.IGetServiceRequest
export type ServiceGetOutputs = Promise<Service>

export type ServiceListInputs = ServiceType.mesg.api.IListServiceRequest
export type ServiceListOutputs = Promise<ServiceType.mesg.api.IListServiceResponse>

export type ServiceCreateInputs = ServiceType.mesg.api.ICreateServiceRequest
export type ServiceCreateOutputs = Promise<ServiceType.mesg.api.ICreateServiceResponse>

export type ServiceDeleteInputs = ServiceType.mesg.api.IDeleteServiceRequest
export type ServiceDeleteOutputs = Promise<ServiceType.mesg.api.IDeleteServiceResponse>

export type ProcessGetInputs = ProcessType.mesg.api.IGetProcessRequest
export type ProcessGetOutputs = Promise<Process>

export type ProcessListInputs = ProcessType.mesg.api.IListProcessRequest
export type ProcessListOutputs = Promise<ProcessType.mesg.api.IListProcessResponse>

export type ProcessCreateInputs = ProcessType.mesg.api.ICreateProcessRequest
export type ProcessCreateOutputs = Promise<ProcessType.mesg.api.ICreateProcessResponse>

export type ProcessDeleteInputs = ProcessType.mesg.api.IDeleteProcessRequest
export type ProcessDeleteOutputs = Promise<ProcessType.mesg.api.IDeleteProcessResponse>

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
  process: {
    get: (request: ProcessGetInputs) => ProcessGetOutputs
    list: (request: ProcessListInputs) => ProcessListOutputs
    create: (request: ProcessCreateInputs) => ProcessCreateOutputs
    delete: (request: ProcessDeleteInputs) => ProcessDeleteOutputs
  },
  core: {
    info: () => InfoOutputs
  }
}

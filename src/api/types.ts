import { Stream } from '../util/grpc'
import * as EventType from './typedef/event'
import * as ExecutionType from './typedef/execution'
import * as InstanceType from './typedef/instance'
import * as ServiceType from './typedef/service'
import * as WorkflowType from './typedef/workflow'

export type hash = Uint8Array

export const ExecutionStatus = {
  UNKNOWN: 0,
  CREATED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  FAILED: 4
}

export type Event = EventType.types.IEvent

export type Execution = ExecutionType.types.IExecution

export type Instance = InstanceType.types.IInstance

export type Service = ServiceType.types.IService

export type Workflow = WorkflowType.types.IWorkflow

export type EventCreateInputs = EventType.api.ICreateEventRequest
export type EventCreateOutputs = Promise<EventType.api.ICreateEventResponse>

export type EventStreamInputs = EventType.api.StreamEventRequest
export type EventStreamOutputs = Stream<Event>

export type ExecutionGetInputs = ExecutionType.api.IGetExecutionRequest
export type ExecutionGetOutputs = Promise<Execution>

export type ExecutionStreamInputs = ExecutionType.api.IStreamExecutionRequest
export type ExecutionStreamOutputs = Stream<Execution>

export type ExecutionCreateInputs = ExecutionType.api.ICreateExecutionRequest
export type ExecutionCreateOutputs = Promise<ExecutionType.api.ICreateExecutionResponse>

export type ExecutionUpdateInputs = ExecutionType.api.IUpdateExecutionRequest
export type ExecutionUpdateOutputs = Promise<ExecutionType.api.IUpdateExecutionResponse>

export type InstanceGetInputs = InstanceType.api.IGetInstanceRequest
export type InstanceGetOutputs = Promise<Instance>

export type InstanceListInputs = InstanceType.api.IListInstancesRequest
export type InstanceListOutputs = Promise<InstanceType.api.IListInstancesResponse>

export type InstanceCreateInputs = InstanceType.api.ICreateInstanceRequest
export type InstanceCreateOutputs = Promise<InstanceType.api.ICreateInstanceResponse>

export type InstanceDeleteInputs = InstanceType.api.IDeleteInstanceRequest
export type InstanceDeleteOutputs = Promise<InstanceType.api.IDeleteInstanceResponse>

export type ServiceGetInputs = ServiceType.api.IGetServiceRequest
export type ServiceGetOutputs = Promise<Service>

export type ServiceListInputs = ServiceType.api.IListServiceRequest
export type ServiceListOutputs = Promise<ServiceType.api.IListServiceResponse>

export type ServiceCreateInputs = ServiceType.api.ICreateServiceRequest
export type ServiceCreateOutputs = Promise<ServiceType.api.ICreateServiceResponse>

export type ServiceDeleteInputs = ServiceType.api.IDeleteServiceRequest
export type ServiceDeleteOutputs = Promise<ServiceType.api.IDeleteServiceResponse>

export type WorkflowGetInputs = WorkflowType.api.IGetWorkflowRequest
export type WorkflowGetOutputs = Promise<Workflow>

export type WorkflowListInputs = WorkflowType.api.IListWorkflowRequest
export type WorkflowListOutputs = Promise<WorkflowType.api.IListWorkflowResponse>

export type WorkflowCreateInputs = WorkflowType.api.ICreateWorkflowRequest
export type WorkflowCreateOutputs = Promise<WorkflowType.api.ICreateWorkflowResponse>

export type WorkflowDeleteInputs = WorkflowType.api.IDeleteWorkflowRequest
export type WorkflowDeleteOutputs = Promise<WorkflowType.api.IDeleteWorkflowResponse>

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
  workflow: {
    get: (request: WorkflowGetInputs) => WorkflowGetOutputs
    list: (request: WorkflowListInputs) => WorkflowListOutputs
    create: (request: WorkflowCreateInputs) => WorkflowCreateOutputs
    delete: (request: WorkflowDeleteInputs) => WorkflowDeleteOutputs
  },
  core: {
    info: () => InfoOutputs
  }
}

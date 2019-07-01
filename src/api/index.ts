import { createClient } from '../util/grpc'
import {
  API,
  EventCreateInputs, EventCreateOutputs, EventStreamInputs,
  ExecutionCreateInputs, ExecutionGetInputs, ExecutionUpdateInputs, ExecutionCreateOutputs, ExecutionGetOutputs, ExecutionUpdateOutputs, ExecutionStreamInputs,
  InstanceCreateInputs, InstanceGetInputs, InstanceListInputs, InstanceDeleteInputs, InstanceCreateOutputs, InstanceGetOutputs, InstanceListOutputs, InstanceDeleteOutputs,
  ServiceCreateInputs, ServiceGetInputs, ServiceListInputs, ServiceDeleteInputs, ServiceCreateOutputs, ServiceGetOutputs, ServiceListOutputs, ServiceDeleteOutputs
} from './types'

const promisify = (client, method) => request => new Promise((resolve, reject) => client[method](request, (err, res) => err ? reject(err) : resolve(res)))

export default (endpoint: string): API => {
  const event = createClient('Event', 'protobuf/api/event.proto', endpoint)
  const execution = createClient('Execution', 'protobuf/api/execution.proto', endpoint)
  const instance = createClient('Instance', 'protobuf/api/instance.proto', endpoint)
  const service = createClient('Service', 'protobuf/api/service.proto', endpoint)
  return {
    event: {
      create: promisify(event, 'Create') as (request: EventCreateInputs) => EventCreateOutputs,
      stream: (request: EventStreamInputs) => event.Stream(request)
    },
    execution: {
      create: promisify(execution, 'Create') as (request: ExecutionCreateInputs) => ExecutionCreateOutputs,
      get: promisify(execution, 'Get') as (request: ExecutionGetInputs) => ExecutionGetOutputs,
      update: promisify(execution, 'Update') as (request: ExecutionUpdateInputs) => ExecutionUpdateOutputs,
      stream: (request: ExecutionStreamInputs) => execution.Stream(request)
    },
    instance: {
      create: promisify(instance, 'Create') as (request: InstanceCreateInputs) => InstanceCreateOutputs,
      get: promisify(instance, 'Get') as (request: InstanceGetInputs) => InstanceGetOutputs,
      list: promisify(instance, 'List') as (request: InstanceListInputs) => InstanceListOutputs,
      delete: promisify(instance, 'Delete') as (request: InstanceDeleteInputs) => InstanceDeleteOutputs
    },
    service: {
      create: promisify(service, 'Create') as (request: ServiceCreateInputs) => ServiceCreateOutputs,
      get: promisify(service, 'Get') as (request: ServiceGetInputs) => ServiceGetOutputs,
      list: promisify(service, 'List') as (request: ServiceListInputs) => ServiceListOutputs,
      delete: promisify(service, 'Delete') as (request: ServiceDeleteInputs) => ServiceDeleteOutputs
    }
  }
}

export * from './types' 
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
      Create: promisify(event, 'Create') as (request: EventCreateInputs) => EventCreateOutputs,
      Stream: (request: EventStreamInputs) => event.Stream(request)
    },
    execution: {
      Create: promisify(execution, 'Create') as (request: ExecutionCreateInputs) => ExecutionCreateOutputs,
      Get: promisify(execution, 'Get') as (request: ExecutionGetInputs) => ExecutionGetOutputs,
      Update: promisify(execution, 'Update') as (request: ExecutionUpdateInputs) => ExecutionUpdateOutputs,
      Stream: (request: ExecutionStreamInputs) => execution.Stream(request)
    },
    instance: {
      Create: promisify(instance, 'Create') as (request: InstanceCreateInputs) => InstanceCreateOutputs,
      Get: promisify(instance, 'Get') as (request: InstanceGetInputs) => InstanceGetOutputs,
      List: promisify(instance, 'List') as (request: InstanceListInputs) => InstanceListOutputs,
      Delete: promisify(instance, 'Delete') as (request: InstanceDeleteInputs) => InstanceDeleteOutputs
    },
    service: {
      Create: promisify(service, 'Create') as (request: ServiceCreateInputs) => ServiceCreateOutputs,
      Get: promisify(service, 'Get') as (request: ServiceGetInputs) => ServiceGetOutputs,
      List: promisify(service, 'List') as (request: ServiceListInputs) => ServiceListOutputs,
      Delete: promisify(service, 'Delete') as (request: ServiceDeleteInputs) => ServiceDeleteOutputs
    }
  }
}

export * from './types' 
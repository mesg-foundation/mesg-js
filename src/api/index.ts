import { createClient } from '../util/grpc'
import { API } from './types'

export default (endpoint: string): API => ({
  event: createClient('Event', 'protobuf/api/event.proto', endpoint),
  execution: createClient('Execution', 'protobuf/api/execution.proto', endpoint),
  instance: createClient('Instance', 'protobuf/api/instance.proto', endpoint),
  service: createClient('Service', 'protobuf/api/service.proto', endpoint),
})

export * from './types' 
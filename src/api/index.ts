import { createClient } from '../util/grpc'
import { API } from './types'

export default (endpoint: string): API => ({
  event: createClient('Event', 'protobuf/event/api.proto', endpoint),
  execution: createClient('Execution', 'protobuf/execution/api.proto', endpoint),
  instance: createClient('Instance', 'protobuf/instance/api.proto', endpoint),
  service: createClient('Service', 'protobuf/service/api.proto', endpoint),
})

export * from './types' 
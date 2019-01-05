import { ServiceError } from 'grpc';
import { CoreClient } from '../client/api-core_grpc_pb';
import {
  ListenEventRequest,
  ListenResultRequest,
  ExecuteTaskRequest
} from '../client/api-core_pb'
import { EventStream } from './event'
import { ResultStream } from './result'

type Options = {
  client: CoreClient
}

type EventFilters = {
  eventKey?: string
}

type ResultFilters = {
  taskKey?: string
  outputKey?: string
  tags?: string[]
}

class Application {
  // api gives access to low level gRPC calls.
  api: CoreClient

  constructor(options: Options){
    this.api = options.client;
  }

  listenEvent(serviceID: string, filters?: EventFilters): EventStream {
    const req = new ListenEventRequest()
    req.setServiceid(serviceID)
    if (filters) {
      if (filters.eventKey) req.setEventfilter(filters.eventKey)
    }
    return new EventStream(this.api.listenEvent(req))
  }

  listenResult(serviceID: string, filters?: ResultFilters): ResultStream {
    const req = new ListenResultRequest()
    req.setServiceid(serviceID)
    if (filters) {
      if (filters.outputKey) req.setTaskfilter(filters.taskKey)
      if (filters.taskKey) req.setOutputfilter(filters.outputKey)
      if (filters.tags) req.setTagfiltersList(filters.tags)
    }
    return new ResultStream(this.api.listenResult(req))
  }

  executeTask(serviceID: string, taskKey: string, inputData: any, tags?: string[]): Promise<string|Error> {
    return new Promise<string | ServiceError>((resolve, reject) => {
      const req = new ExecuteTaskRequest()
      req.setServiceid(serviceID)
      req.setTaskkey(taskKey)
      req.setInputdata(JSON.stringify(inputData))
      if (tags) req.setExecutiontagsList(tags)
      this.api.executeTask(req, (err, reply) => {
        if (err) reject(err)
        else resolve(reply.getExecutionid())
      })
    })
  }
}

export default Application;
export {
  Options,
  EventFilters,
  ResultFilters
}
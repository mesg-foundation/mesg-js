import { ServiceError } from 'grpc';
import { CoreClient } from '../client/api-core_grpc_pb';
import {
  ListenEventRequest as ListenEventRequestPB,
  ListenResultRequest as ListenResultRequestPB,
  ExecuteTaskRequest as ExecuteTaskRequestPB
} from '../client/api-core_pb'
import { EventStream } from './event'
import { ResultStream } from './result'

type Options = {
  client: CoreClient
}

type ListenEventRequest = {
  serviceID: string
  eventKey?: string
}

type ListenResultRequest = {
  serviceID: string
  taskKey?: string
  outputKey?: string
  tags?: string[]
}

type ExecuteTaskRequest = {
  serviceID: string
  taskKey: string
  inputData: any
  tags?: string[]
}

class Application {
  // api gives access to low level gRPC calls.
  api: CoreClient

  constructor(options: Options){
    this.api = options.client;
  }

  listenEvent(req: ListenEventRequest): EventStream {
    const r = new ListenEventRequestPB()
    r.setServiceid(req.serviceID)
    if (req.eventKey) r.setEventfilter(req.eventKey)
    return new EventStream(this.api.listenEvent(r))
  }

  listenResult(req: ListenResultRequest): ResultStream {
    const r = new ListenResultRequestPB()
    r.setServiceid(req.serviceID)
    if (req.outputKey) r.setTaskfilter(req.taskKey)
    if (req.taskKey) r.setOutputfilter(req.outputKey)
    if (req.tags) r.setTagfiltersList(req.tags)
    return new ResultStream(this.api.listenResult(r))
  }

  executeTask(req: ExecuteTaskRequest): Promise<string|Error> {
    return new Promise<string | ServiceError>((resolve, reject) => {
      const r = new ExecuteTaskRequestPB()
      r.setServiceid(req.serviceID)
      r.setTaskkey(req.taskKey)
      r.setInputdata(JSON.stringify(req.inputData))
      if (req.tags) r.setExecutiontagsList(req.tags)
      this.api.executeTask(r, (err, reply) => {
        if (err) reject(err)
        else resolve(reply.getExecutionid())
      })
    })
  }
}

export default Application;
export {
  Options,
  ListenEventRequest,
  ListenResultRequest,
  ExecuteTaskRequest
}
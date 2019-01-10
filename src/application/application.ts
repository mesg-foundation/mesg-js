import * as uuidv4 from 'uuid/v4'
import { handleAPIResponse } from '../util/api';
import { checkStreamReady, errNoStatus } from '../util/grpc';

type Options = {
  client
}

class Application {
  // api gives access to low level gRPC calls.
  api

  constructor(options: Options){
    this.api = options.client;
  }

  listenEvent(req: ListenEventRequest): Stream<EventData> {
    return this.api.ListenEvent(req)
  }

  listenResult(req: ListenResultRequest): Stream<ResultData> {
    return this.api.ListenResult(req)
  }

  executeTask(req: ExecuteTaskRequest): Promise<ExecuteTaskReply> {
    return new Promise<ExecuteTaskReply>((resolve, reject) => {
      this.api.ExecuteTask(req, handleAPIResponse(resolve, reject))
    })
  }

  executeTaskAndWaitFirstResult(req: ExecuteTaskRequest): Promise<ResultData> {
    return new Promise<ResultData>((resolve, reject) => {
      const id = uuidv4()
      const stream = this.listenResult({ serviceID: req.serviceID, tagFilters: [id] })
        .on('metadata', (metadata) => {
          const err = checkStreamReady(metadata)
          if (err == errNoStatus) return
          if (err) {
            stream.destroy(err)
            return
          }
          if (req.executionTags) {
            req.executionTags.push(id)
          } else {
            req.executionTags = [id]
          }
          this.executeTask(req).catch((err) => stream.destroy(err))
        })
        .on('data', (result) => {
          stream.cancel()
          resolve(result)
        })
        .on('error', (err) => {
          stream.cancel()
          reject(err)
        })
    })
  }
}

declare interface Stream<T> {
  on(event: 'data', listener: (data: T) => void): this;
  on(event: 'end', listener: () => void): this;
  on(event: 'error', listener: (e) => void): this;
  on(event: 'status', listener: (status) => void): this;
  on(event: 'metadata', listener: (metadata) => void): this;
  cancel(): void
  destroy(err?: Error): void
}

interface ListenEventRequest {
  serviceID: string
  eventFilter?: string
}

interface ListenResultRequest {
  serviceID: string
  taskFilter?: string
  outputFilter?: string
  tagFilters?: string[]
}

interface EventData {
  eventKey: string
  eventData: string
}

interface ResultData {
  executionID: string
  taskKey: string
  outputKey: string
  outputData: string
  executionTags: string[]
  error: string
}

interface ExecuteTaskRequest {
  serviceID: string
  taskKey: string
  inputData: string
  executionTags?: string[]
}

interface ExecuteTaskReply {
  executionID: string
}

export default Application;
export {
  Options,
  Stream,
  ListenEventRequest,
  ExecuteTaskRequest,
  ExecuteTaskReply,
  ListenResultRequest,
  EventData,
  ResultData
}

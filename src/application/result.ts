import * as grpc from 'grpc';
import { ResultData } from '../client/api-core_pb'
import { EventEmitter } from 'events'

declare interface ResultStream {
  cancel(): void;
  on(type: 'result', handler: (message: Result) => void): this;
  on(type: 'end', handler: (err: Error|null) => void): this;
}

type Result = {
  executionID: string
  error: string
  taskKey: string
  outputKey: string
  outputData: any
  tags: string[]
}

class ResultStream {
  private stream: grpc.ClientReadableStream<ResultData>
  private emitter = new EventEmitter()

  constructor(stream: grpc.ClientReadableStream<ResultData>){
    this.stream = stream
    .on('data', (data: ResultData) => {
      this.emitter.emit('result', <Result>{
        executionID: data.getExecutionid(),
        error: data.getError(),
        taskKey: data.getTaskkey(),
        outputKey: data.getOutputkey(),
        outputData: JSON.parse(data.getOutputdata()),
        tags: data.getExecutiontagsList(),
      })
    })
    .on('error', (err) => {
      this.emitter.emit('end', err)
    })
    .on('end', () => {
      this.emitter.emit('end', null)
    })
  }

  on(type, handler): this {
    this.emitter.on(type, handler)
    return this
  }

  cancel() {
    this.stream.cancel()
  }
}

export {
  ResultStream,
  Result
}
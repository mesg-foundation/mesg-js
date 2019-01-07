import * as grpc from 'grpc';
import { TaskData } from '../client/api-service_pb'
import { EventEmitter } from 'events'

declare interface TaskStream {
  cancel(): void;
  on(type: 'task', handler: (message: Task) => void): this;
  on(type: 'end', handler: (err: Error|null) => void): this;
}

type Task = {
  executionID: string
  taskKey: string
  inputData: any
}

class TaskStream {
  private stream: grpc.ClientReadableStream<TaskData>
  private emitter = new EventEmitter()

  constructor(stream: grpc.ClientReadableStream<TaskData>){
    this.stream = stream
    .on('data', (data: TaskData) => {
      this.emitter.emit('task', <Task>{
        executionID: data.getExecutionid(),
        taskKey: data.getTaskkey(),
        inputData: JSON.parse(data.getInputdata())
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
  TaskStream,
  Task
}
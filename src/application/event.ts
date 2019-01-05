import * as grpc from 'grpc';
import { EventData } from '../client/api-core_pb'
import { EventEmitter } from 'events';

declare interface EventStream {
  cancel(): void;
  on(type: 'event', handler: (message: Event) => void): this;
  on(type: 'end', handler: (err: Error|null) => void): this;
}

type Event = {
  key: string
  data: any
}
  
class EventStream {
  private stream: grpc.ClientReadableStream<EventData>
  private emitter = new EventEmitter()

  constructor(stream: grpc.ClientReadableStream<EventData>){
    this.stream = stream
    .on('data', (data: EventData) => {
      this.emitter.emit('event', <Event>{
        key: data.getEventkey(),
        data: JSON.parse(data.getEventdata())
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
  EventStream,
  Event
}
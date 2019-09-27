import { EventEmitter } from 'events'
import { API } from './types'
import { Stream } from '../util/grpc';
import { encode } from '../util/encoder';

const hash = Buffer.from('hash')

class StreamMock<T> implements Stream<T> {
  private eventEmitter = new EventEmitter()
  on(event: 'data' | 'end' | 'error' | 'status' | 'metadata', listener: (data: any) => void): this {
    this.eventEmitter.on(event, listener)
    return this
  }
  cancel(): void { }
  destroy(err?: Error): void { }
  emit(event: 'data' | 'end' | 'error' | 'status' | 'metadata', data: any) {
    this.eventEmitter.emit(event, data)
  }
}

export const streams = {
  event: new StreamMock<any>(),
  execution: new StreamMock<any>()
}

export default (endpoint: string): API => ({
  account: {
    get() { return Promise.resolve({ }) },
    list() { return Promise.resolve({ accounts: [] }) },
    create() { return Promise.resolve({ name: "name", mnemonic: "mnemonic" }) },
    delete() { return Promise.resolve({}) },
  },
  event: {
    create() { return Promise.resolve({ hash }) },
    stream() { return streams.event },
  },
  execution: {
    create() { return Promise.resolve({ hash }) },
    get() { return Promise.resolve({ parentHash: hash, eventHash: Buffer.from('xxx'), status: 0, instanceHash: hash, taskKey: 'xxx', inputs: encode({}) }) },
    stream() { return streams.execution },
    update() { return Promise.resolve({}) }
  },
  instance: {
    create() { return Promise.resolve({ hash }) },
    get() { return Promise.resolve({ serviceHash: hash }) },
    list() { return Promise.resolve({ instances: [] }) },
    delete() { return Promise.resolve({}) }
  },
  service: {
    create() { return Promise.resolve({ hash }) },
    get() { return Promise.resolve({ sid: 'xxx', source: 'xxx' }) },
    list() { return Promise.resolve({ services: [] }) },
    delete() { return Promise.resolve({}) },
  },
  process: {
    create() { return Promise.resolve({ hash }) },
    get() { return Promise.resolve({ }) },
    list() { return Promise.resolve({ processes: [] }) },
    delete() { return Promise.resolve({}) },
  },
  ownership: {
    list() { return Promise.resolve({ ownerships: [] }) },
  }
})

export * from './types' 

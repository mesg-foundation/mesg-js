import { EventEmitter } from 'events'
import { API, Event, Execution } from './types'
import { Stream } from '../util/grpc';

const hash = 'hash'

export default (endpoint: string): API => ({
  event: {
    Create() { return Promise.resolve({ hash }) },
    Stream() { return (new EventEmitter() as any) as Stream<Event> },
  },
  execution: {
    Create() { return Promise.resolve({ hash }) },
    Get() { return Promise.resolve({ parentHash: hash, eventID: 'xxx', status: 0, instanceHash: hash, taskKey: 'xxx', inputs: '{}' }) },
    Stream() { return (new EventEmitter() as any) as Stream<Execution> },
    Update() { return Promise.resolve({}) }
  },
  instance: {
    Create() { return Promise.resolve({ hash }) },
    Get() { return Promise.resolve({ serviceHash: hash }) },
    List() { return Promise.resolve({ instances: [] }) },
    Delete() { return Promise.resolve({}) }
  },
  service: {
    Create() { return Promise.resolve({ hash }) },
    Get() { return Promise.resolve({ sid: 'xxx', source: 'xxx' }) },
    List() { return Promise.resolve({ services: [] }) },
    Delete() { return Promise.resolve({}) },
  }
})

export * from './types' 
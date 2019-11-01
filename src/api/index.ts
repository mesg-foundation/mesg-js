import { Metadata } from 'grpc'
import { createClient } from '../util/grpc'
import {
  API,
  AccountCreateInputs, AccountGetInputs, AccountListInputs, AccountDeleteInputs, AccountCreateOutputs, AccountGetOutputs, AccountListOutputs, AccountDeleteOutputs,
  EventCreateInputs, EventCreateOutputs, EventStreamInputs,
  ExecutionCreateInputs, ExecutionGetInputs, ExecutionUpdateInputs, ExecutionCreateOutputs, ExecutionGetOutputs, ExecutionUpdateOutputs, ExecutionStreamInputs,
  InstanceGetInputs, InstanceListInputs, InstanceGetOutputs, InstanceListOutputs,
  ServiceCreateInputs, ServiceGetInputs, ServiceListInputs, ServiceCreateOutputs, ServiceGetOutputs, ServiceListOutputs, ServiceExistsOutputs,
  ProcessCreateInputs, ProcessGetInputs, ProcessListInputs, ProcessDeleteInputs, ProcessCreateOutputs, ProcessGetOutputs, ProcessListOutputs, ProcessDeleteOutputs,
  OwnershipListInputs, OwnershipListOutputs,
  RunnerCreateInputs, RunnerGetInputs, RunnerListInputs, RunnerCreateOutputs, RunnerGetOutputs, RunnerListOutputs, RunnerDeleteInputs, RunnerDeleteOutputs,
  Credential,
  ServiceExistsInputs,
  ServiceHashInputs,
  ServiceHashOutputs
} from './types'

const promisify = (client, method) => (request, credential?: Credential) => {
  const metadata = new Metadata()
  if (credential) {
    metadata.set('credential_username', credential.username)
    metadata.set('credential_passphrase', credential.passphrase)
  }
  return new Promise((resolve, reject) => client[method](request, metadata, (err, res) => err ? reject(err) : resolve(res)))
}

export default (endpoint: string): API => {
  const account = createClient('Account', 'protobuf/api/account.proto', endpoint)
  const event = createClient('Event', 'protobuf/api/event.proto', endpoint)
  const execution = createClient('Execution', 'protobuf/api/execution.proto', endpoint)
  const instance = createClient('Instance', 'protobuf/api/instance.proto', endpoint)
  const service = createClient('Service', 'protobuf/api/service.proto', endpoint)
  const process = createClient('Process', 'protobuf/api/process.proto', endpoint)
  const ownership = createClient('Ownership', 'protobuf/api/ownership.proto', endpoint)
  const runner = createClient('Runner', 'protobuf/api/runner.proto', endpoint)
  return {
    account: {
      get: promisify(account, 'Get') as (request: AccountGetInputs, credential?: Credential) => AccountGetOutputs,
      list: promisify(account, 'List') as (request: AccountListInputs, credential?: Credential) => AccountListOutputs,
      create: promisify(account, 'Create') as (request: AccountCreateInputs, credential?: Credential) => AccountCreateOutputs,
      delete: promisify(account, 'Delete') as (request: AccountDeleteInputs, credential?: Credential) => AccountDeleteOutputs
    },
    event: {
      create: promisify(event, 'Create') as (request: EventCreateInputs, credential?: Credential) => EventCreateOutputs,
      stream: (request: EventStreamInputs, credential?: Credential) => event.Stream(request)
    },
    execution: {
      create: promisify(execution, 'Create') as (request: ExecutionCreateInputs, credential?: Credential) => ExecutionCreateOutputs,
      get: promisify(execution, 'Get') as (request: ExecutionGetInputs, credential?: Credential) => ExecutionGetOutputs,
      update: promisify(execution, 'Update') as (request: ExecutionUpdateInputs, credential?: Credential) => ExecutionUpdateOutputs,
      stream: (request: ExecutionStreamInputs, credential?: Credential) => execution.Stream(request)
    },
    instance: {
      get: promisify(instance, 'Get') as (request: InstanceGetInputs, credential?: Credential) => InstanceGetOutputs,
      list: promisify(instance, 'List') as (request: InstanceListInputs, credential?: Credential) => InstanceListOutputs,
    },
    service: {
      create: promisify(service, 'Create') as (request: ServiceCreateInputs, credential?: Credential) => ServiceCreateOutputs,
      get: promisify(service, 'Get') as (request: ServiceGetInputs, credential?: Credential) => ServiceGetOutputs,
      exists: promisify(service, 'Exists') as (request: ServiceExistsInputs, credential?: Credential) => ServiceExistsOutputs,
      hash: promisify(service, 'Hash') as (request: ServiceHashInputs, credential?: Credential) => ServiceHashOutputs,
      list: promisify(service, 'List') as (request: ServiceListInputs, credential?: Credential) => ServiceListOutputs,
    },
    process: {
      create: promisify(process, 'Create') as (request: ProcessCreateInputs, credential?: Credential) => ProcessCreateOutputs,
      get: promisify(process, 'Get') as (request: ProcessGetInputs, credential?: Credential) => ProcessGetOutputs,
      list: promisify(process, 'List') as (request: ProcessListInputs, credential?: Credential) => ProcessListOutputs,
      delete: promisify(process, 'Delete') as (request: ProcessDeleteInputs, credential?: Credential) => ProcessDeleteOutputs
    },
    ownership: {
      list: promisify(ownership, 'List') as (request: OwnershipListInputs, credential?: Credential) => OwnershipListOutputs,
    },
    runner: {
      create: promisify(runner, 'Create') as (request: RunnerCreateInputs, credential?: Credential) => RunnerCreateOutputs,
      get: promisify(runner, 'Get') as (request: RunnerGetInputs, credential?: Credential) => RunnerGetOutputs,
      list: promisify(runner, 'List') as (request: RunnerListInputs, credential?: Credential) => RunnerListOutputs,
      delete: promisify(runner, 'Delete') as (request: RunnerDeleteInputs, credential?: Credential) => RunnerDeleteOutputs
    },
  }
}

export * from './types' 

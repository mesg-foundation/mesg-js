import { Stream } from '../util/grpc'
import * as AccountType from './typedef/account'
import * as EventType from './typedef/event'
import * as ExecutionType from './typedef/execution'
import * as InstanceType from './typedef/instance'
import * as RunnerType from './typedef/runner'
import * as ServiceType from './typedef/service'
import * as ProcessType from './typedef/process'
import * as OwnershipType from './typedef/ownership'

export type hash = Uint8Array

export const ExecutionStatus = {
  UNKNOWN: 0,
  CREATED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  FAILED: 4
}

export type Credential = {
  username: string
  passphrase: string
}

export type Account = AccountType.mesg.types.IAccount

export type Event = EventType.mesg.types.IEvent

export type Execution = ExecutionType.mesg.types.IExecution

export type Instance = InstanceType.mesg.types.IInstance

export type Runner = RunnerType.mesg.types.IRunner

export type Service = ServiceType.mesg.types.IService

export type Process = ProcessType.mesg.types.IProcess

export type Ownership = OwnershipType.mesg.types.IOwnership

export type AccountGetInputs = AccountType.mesg.api.IGetAccountRequest
export type AccountGetOutputs = Promise<Account>

export type AccountListInputs = AccountType.mesg.api.IListAccountRequest
export type AccountListOutputs = Promise<AccountType.mesg.api.ListAccountResponse>

export type AccountCreateInputs = AccountType.mesg.api.ICreateAccountRequest
export type AccountCreateOutputs = Promise<AccountType.mesg.api.ICreateAccountResponse>

export type AccountDeleteInputs = AccountType.mesg.api.IDeleteAccountRequest
export type AccountDeleteOutputs = Promise<AccountType.mesg.api.IDeleteAccountResponse>

export type EventCreateInputs = EventType.mesg.api.ICreateEventRequest
export type EventCreateOutputs = Promise<EventType.mesg.api.ICreateEventResponse>

export type EventStreamInputs = EventType.mesg.api.StreamEventRequest
export type EventStreamOutputs = Stream<Event>

export type ExecutionGetInputs = ExecutionType.mesg.api.IGetExecutionRequest
export type ExecutionGetOutputs = Promise<Execution>

export type ExecutionStreamInputs = ExecutionType.mesg.api.IStreamExecutionRequest
export type ExecutionStreamOutputs = Stream<Execution>

export type ExecutionCreateInputs = ExecutionType.mesg.api.ICreateExecutionRequest
export type ExecutionCreateOutputs = Promise<ExecutionType.mesg.api.ICreateExecutionResponse>

export type ExecutionUpdateInputs = ExecutionType.mesg.api.IUpdateExecutionRequest
export type ExecutionUpdateOutputs = Promise<ExecutionType.mesg.api.IUpdateExecutionResponse>

export type InstanceGetInputs = InstanceType.mesg.api.IGetInstanceRequest
export type InstanceGetOutputs = Promise<Instance>

export type InstanceListInputs = InstanceType.mesg.api.IListInstanceRequest
export type InstanceListOutputs = Promise<InstanceType.mesg.api.IListInstanceResponse>

export type RunnerGetInputs = RunnerType.mesg.api.IGetRunnerRequest
export type RunnerGetOutputs = Promise<Runner>

export type RunnerListInputs = RunnerType.mesg.api.IListRunnerRequest
export type RunnerListOutputs = Promise<RunnerType.mesg.api.IListRunnerResponse>

export type RunnerCreateInputs = RunnerType.mesg.api.ICreateRunnerRequest
export type RunnerCreateOutputs = Promise<Runner>

export type RunnerDeleteInputs = RunnerType.mesg.api.IDeleteRunnerRequest
export type RunnerDeleteOutputs = Promise<RunnerType.mesg.api.IDeleteRunnerResponse>

export type ServiceGetInputs = ServiceType.mesg.api.IGetServiceRequest
export type ServiceGetOutputs = Promise<Service>

export type ServiceHashInputs = ServiceType.mesg.api.ICreateServiceRequest
export type ServiceHashOutputs = Promise<ServiceType.mesg.api.IHashServiceResponse>

export type ServiceExistsInputs = ServiceType.mesg.api.IExistsServiceRequest
export type ServiceExistsOutputs = Promise<ServiceType.mesg.api.IExistsServiceResponse>

export type ServiceListInputs = ServiceType.mesg.api.IListServiceRequest
export type ServiceListOutputs = Promise<ServiceType.mesg.api.IListServiceResponse>

export type ServiceCreateInputs = ServiceType.mesg.api.ICreateServiceRequest
export type ServiceCreateOutputs = Promise<ServiceType.mesg.api.ICreateServiceResponse>

export type ProcessGetInputs = ProcessType.mesg.api.IGetProcessRequest
export type ProcessGetOutputs = Promise<Process>

export type ProcessListInputs = ProcessType.mesg.api.IListProcessRequest
export type ProcessListOutputs = Promise<ProcessType.mesg.api.IListProcessResponse>

export type ProcessCreateInputs = ProcessType.mesg.api.ICreateProcessRequest
export type ProcessCreateOutputs = Promise<ProcessType.mesg.api.ICreateProcessResponse>

export type ProcessDeleteInputs = ProcessType.mesg.api.IDeleteProcessRequest
export type ProcessDeleteOutputs = Promise<ProcessType.mesg.api.IDeleteProcessResponse>

export type OwnershipListInputs = OwnershipType.mesg.api.IListOwnershipRequest
export type OwnershipListOutputs = Promise<OwnershipType.mesg.api.IListOwnershipResponse>

export type API = {
  account: {
    get: (request: AccountGetInputs, credential?: Credential) => AccountGetOutputs
    list: (request: AccountListInputs, credential?: Credential) => AccountListOutputs
    create: (request: AccountCreateInputs, credential?: Credential) => AccountCreateOutputs
    delete: (request: AccountDeleteInputs, credential?: Credential) => AccountDeleteOutputs
  },
  event: {
    create: (request: EventCreateInputs, credential?: Credential) => EventCreateOutputs
    stream: (request: EventStreamInputs, credential?: Credential) => EventStreamOutputs
  }
  execution: {
    get: (request: ExecutionGetInputs, credential?: Credential) => ExecutionGetOutputs
    stream: (request: ExecutionStreamInputs, credential?: Credential) => ExecutionStreamOutputs
    create: (request: ExecutionCreateInputs, credential?: Credential) => ExecutionCreateOutputs
    update: (request: ExecutionUpdateInputs, credential?: Credential) => ExecutionUpdateOutputs
  }
  instance: {
    get: (request: InstanceGetInputs, credential?: Credential) => InstanceGetOutputs
    list: (request: InstanceListInputs, credential?: Credential) => InstanceListOutputs
  }
  runner: {
    get: (request: RunnerGetInputs, credential?: Credential) => RunnerGetOutputs
    list: (request: RunnerListInputs, credential?: Credential) => RunnerListOutputs
    create: (request: RunnerCreateInputs, credential?: Credential) => RunnerCreateOutputs
    delete: (request: RunnerDeleteInputs, credential?: Credential) => RunnerDeleteOutputs
  }
  service: {
    get: (request: ServiceGetInputs, credential?: Credential) => ServiceGetOutputs
    hash: (request: ServiceHashInputs, credential?: Credential) => ServiceHashOutputs
    exists: (request: ServiceExistsInputs, credential?: Credential) => ServiceExistsOutputs
    list: (request: ServiceListInputs, credential?: Credential) => ServiceListOutputs
    create: (request: ServiceCreateInputs, credential?: Credential) => ServiceCreateOutputs
  },
  process: {
    get: (request: ProcessGetInputs, credential?: Credential) => ProcessGetOutputs
    list: (request: ProcessListInputs, credential?: Credential) => ProcessListOutputs
    create: (request: ProcessCreateInputs, credential?: Credential) => ProcessCreateOutputs
    delete: (request: ProcessDeleteInputs, credential?: Credential) => ProcessDeleteOutputs
  },
  ownership: {
    list: (request: OwnershipListInputs, credential?: Credential) => OwnershipListOutputs
  }
}

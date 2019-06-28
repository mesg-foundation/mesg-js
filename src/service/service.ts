import { handleAPIResponse } from '../util/api'
import { API, ExecutionStatus, ExecutionStreamOutputs, EventCreateOutputs } from '../api';


type Options = {
  token: string
  definition: any
  API: API
}

class Service {
  // api gives access to low level gRPC calls.
  private API: API

  private token: string
  private definition: any
  private tasks: Tasks

  constructor(options: Options) {
    this.definition = options.definition;
    this.API = options.API;
    this.token = options.token;
  }

  listenTask({ ...tasks }: Tasks): ExecutionStreamOutputs {
    if (this.tasks) {
      throw new Error(`listenTask should be called only once`);
    }
    this.tasks = tasks;
    this.validateTaskNames();
    const stream = this.API.execution.Stream({
      filter: {
        instanceHash: this.token,
        statuses: [ExecutionStatus.IN_PROGRESS],
      }
    });
    stream.on('data', this.handleTaskData.bind(this));
    return stream;
  }

  emitEvent(event: string, data: EventData): Promise<EventCreateOutputs> {
    if (!data) throw new Error('data object must be send while emitting event')
    return new Promise((resolve, reject) => this.API.event.Create({
      instanceHash: this.token,
      key: event,
      data: JSON.stringify(data)
    }, handleAPIResponse(resolve, reject)))
  }

  private async handleTaskData({ hash, taskKey, inputs }) {
    const callback = this.tasks[taskKey];
    if (!callback) {
      throw new Error(`Task ${taskKey} is not defined in your services`);
    }
    const data = JSON.parse(inputs);
    try {
      const outputData = await callback(data);
      const outputs = JSON.stringify(outputData);
      return new Promise((resolve, reject) => this.API.execution.Update({ hash, outputs }, handleAPIResponse(resolve, reject)));
    } catch (err) {
      const error = err.message;
      return new Promise((resolve, reject) => this.API.execution.Update({ hash, error }, handleAPIResponse(resolve, reject)));
    }
  }

  private validateTaskNames() {
    const nonDescribedTasks = Object.keys(this.tasks).filter(x => !this.definition.tasks[x]);
    if (nonDescribedTasks.length > 0) {
      throw new Error(`The following tasks are not present in the mesg.yml: ${nonDescribedTasks.join(', ')}`);
    }
    const nonHandledTasks = Object.keys(this.definition.tasks).filter(x => !this.tasks[x]);
    if (nonHandledTasks.length > 0) {
      console.warn(`WARNING: The following tasks described in the mesg.yml haven't been implemented: ${nonHandledTasks.join(', ')}`);
    }
  }
}

interface Tasks {
  [task: string]: (inputs: TaskInputs) => object | Promise<object>
}

interface TaskInputs {
  [key: string]: any
}

interface EventData {
  [key: string]: any
}

export default Service;
export {
  Tasks,
  TaskInputs,
}

import { API, ExecutionStatus, ExecutionStreamOutputs, EventCreateOutputs, Execution } from '../api';
import { decode, encode } from '../util/encoder'

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
    const stream = this.API.execution.stream({
      filter: {
        instanceHash: this.token,
        statuses: [ExecutionStatus.IN_PROGRESS],
      }
    });
    stream.on('data', this.handleTaskData.bind(this));
    return stream;
  }

  emitEvent(event: string, data: EventData): EventCreateOutputs {
    if (!data) throw new Error('data object must be send while emitting event')
    return this.API.event.create({
      instanceHash: this.token,
      key: event,
      data: encode(data)
    })
  }

  private async handleTaskData({ hash, taskKey, inputs }: Execution) {
    const callback = this.tasks[taskKey];
    if (!callback) {
      throw new Error(`Task ${taskKey} is not defined in your services`);
    }
    try {
      const outputs = await callback(decode(inputs));
      return this.API.execution.update({
        hash,
        outputs: encode(outputs)
      });
    } catch (err) {
      const error = err.message;
      return this.API.execution.update({ hash, error });
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
  [task: string]: (inputs: TaskInputs) => TaskOutputs | Promise<TaskOutputs>
}

interface TaskOutputs {
  [key: string]: any
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

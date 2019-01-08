import * as grpc from 'grpc'
import { handleAPIResponse } from '../util/api';
import {
  ListenTaskRequest,
  EmitEventRequest,
  SubmitResultRequest,
  EmitEventReply,
  SubmitResultReply
} from '../client/api-service_pb';
import { ServiceClient } from '../client/api-service_grpc_pb';
import { TaskStream } from './task'

type Options = {
  token: string
  mesgConfig: any
  client: ServiceClient
}

class Service {
  private token: string
  private client: ServiceClient
  private mesgConfig: any
  private tasks: Tasks

  constructor(options: Options){
    this.mesgConfig = options.mesgConfig;
    this.client = options.client;
    this.token = options.token;
  }

  listenTask({ ...tasks }: Tasks): TaskStream {
    if (this.tasks) {
      throw new Error(`listenTask should be called only once`);
    }
    this.tasks = tasks;
    this.validateTaskNames();
    const req = new ListenTaskRequest()
    req.setToken(this.token);
    const stream = new TaskStream(this.client.listenTask(req));
    stream.on('task', this.handleTaskData.bind(this));
    return stream;
  }

  emitEvent(event: string, data: any): Promise<grpc.ServiceError|null> {
    return new Promise<grpc.ServiceError|null>((resolve, reject) => {
      const req = new EmitEventRequest();
      req.setToken(this.token);
      req.setEventkey(event);
      req.setEventdata(JSON.stringify(data))
      this.client.emitEvent(req, (err) => { err ? reject(err) : resolve(null); });
    })
  }

  private handleTaskData({ executionID, taskKey, inputData }) {
    const callback = this.tasks[taskKey];
    if (!callback) {
      throw new Error(`Task ${taskKey} is not defined in your services`);
    }
    
    const outputs = {};
    const taskConfig = this.mesgConfig.tasks[taskKey];

    for (let outputKey in taskConfig.outputs){
      outputs[outputKey] = (data: TaskOutputCallbackInput): Promise<SubmitResultReply | grpc.ServiceError> => {
        return new Promise<SubmitResultReply | grpc.ServiceError>((resolve, reject) => {
          const req = new SubmitResultRequest();
          req.setExecutionid(executionID);
          req.setOutputkey(outputKey);
          req.setOutputdata(JSON.stringify(data));
          this.client.submitResult(req, handleAPIResponse(resolve, reject));
        })
      }
    }

    callback(inputData, outputs);
  }

  private validateTaskNames(){
    const nonDescribedTasks = Object.keys(this.tasks).filter(x => !this.mesgConfig.tasks[x]);
    if (nonDescribedTasks.length > 0){
      throw new Error(`The following tasks does not present in your mesg.yml: ${nonDescribedTasks.join(', ')}`);
    }
    const nonHandledTasks = Object.keys(this.mesgConfig.tasks).filter(x => !this.tasks[x]);
    if (nonHandledTasks.length > 0){
      throw new Error(`The following tasks described in your mesg.yml don't have callbacks: ${nonHandledTasks.join(', ')}`);
    }
  }
}

interface Tasks {
  [task: string]: (inputs: TaskInputs, outputs: TaskOutputs) => void
}

interface TaskInputs {
  [key: string]: any
}

interface TaskOutputs  {
  [key: string]: (input: TaskOutputCallbackInput) => Promise<void>
}

interface TaskOutputCallbackInput {
  [key: string]: any
}

export default Service;
export {
  Options,
  Tasks,
  TaskInputs,
  TaskOutputs,
  TaskOutputCallbackInput
}

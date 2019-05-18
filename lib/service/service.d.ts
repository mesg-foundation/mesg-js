import { Stream } from '../util/grpc';
declare type Options = {
    token: string;
    definition: any;
    client: any;
};
declare class Service {
    api: any;
    private token;
    private definition;
    private tasks;
    constructor(options: Options);
    listenTask({ ...tasks }: Tasks): Stream<TaskData>;
    emitEvent(event: string, data: EventData): Promise<EmitEventReply | Error>;
    private handleTaskData;
    private validateTaskNames;
}
interface Tasks {
    [task: string]: (inputs: TaskInputs, outputs: TaskOutputs) => void;
}
interface TaskInputs {
    [key: string]: any;
}
interface TaskOutputs {
    [key: string]: (input: TaskOutputCallbackInput) => Promise<void>;
}
interface TaskOutputCallbackInput {
    [key: string]: any;
}
interface EventData {
    [key: string]: any;
}
interface EmitEventReply {
}
interface SubmitResultReply {
}
interface TaskData {
    executionID: string;
    taskKey: string;
    inputData: string;
}
export default Service;
export { Options, Tasks, TaskInputs, TaskOutputs, TaskOutputCallbackInput, Stream, EmitEventReply, SubmitResultReply, TaskData, };

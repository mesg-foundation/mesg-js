import Service from './service';
declare const serviceBuilder: () => Service;
export default serviceBuilder;
export { Service };
export { Tasks, TaskInputs, TaskOutputs, TaskOutputCallbackInput, Stream, EmitEventReply, SubmitResultReply, TaskData } from './service';

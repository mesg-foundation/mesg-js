import Application from './application';
declare type Options = {
    endpoint?: string;
};
declare const applicationBuilder: (options?: Options) => Application;
export default applicationBuilder;
export { Application, Options };
export { Stream, ListenEventRequest, ExecuteTaskRequest, ExecuteTaskReply, ListenResultRequest, EventData, ResultData } from './application';

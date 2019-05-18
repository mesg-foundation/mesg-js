/// <reference types="@types/node" />
declare function createClient(serviceName: string, filePath: string, endpoint: string): any;
declare const errNoStatus: Error;
declare const checkStreamReady: (metadata: Metadata) => Error;
interface Stream<T> {
    on(event: 'data', listener: (data: T) => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'status', listener: (status: Status) => void): this;
    on(event: 'metadata', listener: (metadata: Metadata) => void): this;
    cancel(): void;
    destroy(err?: Error): void;
}
interface Metadata {
    get(key: string): Array<string | Buffer>;
}
interface Status {
    code: number;
    details: string;
    metadata: Metadata;
}
export { createClient, checkStreamReady, errNoStatus, Stream };

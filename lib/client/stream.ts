declare interface Stream<T> {
    on(event: 'data', listener: (data: T) => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (e) => void): this;
    on(event: 'status', listener: (status) => void): this;
}

export {
    Stream
}
import * as $protobuf from "protobufjs";
export = mesg;

declare namespace mesg {


    /** Namespace types. */
    namespace types {

        /** Properties of an Event. */
        interface IEvent {

            /** Event hash */
            hash?: (string|null);

            /** Event instanceHash */
            instanceHash?: (string|null);

            /** Event key */
            key?: (string|null);

            /** Event data */
            data?: (string|null);
        }

        /** Represents an Event. */
        class Event implements IEvent {

            /**
             * Constructs a new Event.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IEvent);

            /** Event hash. */
            public hash: string;

            /** Event instanceHash. */
            public instanceHash: string;

            /** Event key. */
            public key: string;

            /** Event data. */
            public data: string;
        }
    }

    /** Namespace api. */
    namespace api {

        /** Represents an Event */
        class Event extends $protobuf.rpc.Service {

            /**
             * Constructs a new Event service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Create.
             * @param request CreateEventRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateEventResponse
             */
            public create(request: api.ICreateEventRequest, callback: api.Event.CreateCallback): void;

            /**
             * Calls Create.
             * @param request CreateEventRequest message or plain object
             * @returns Promise
             */
            public create(request: api.ICreateEventRequest): Promise<api.CreateEventResponse>;

            /**
             * Calls Stream.
             * @param request StreamEventRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Event
             */
            public stream(request: api.IStreamEventRequest, callback: api.Event.StreamCallback): void;

            /**
             * Calls Stream.
             * @param request StreamEventRequest message or plain object
             * @returns Promise
             */
            public stream(request: api.IStreamEventRequest): Promise<types.Event>;
        }

        namespace Event {

            /**
             * Callback as used by {@link api.Event#create}.
             * @param error Error, if any
             * @param [response] CreateEventResponse
             */
            type CreateCallback = (error: (Error|null), response?: api.CreateEventResponse) => void;

            /**
             * Callback as used by {@link api.Event#stream}.
             * @param error Error, if any
             * @param [response] Event
             */
            type StreamCallback = (error: (Error|null), response?: types.Event) => void;
        }

        /** Properties of a StreamEventRequest. */
        interface IStreamEventRequest {

            /** StreamEventRequest filter */
            filter?: (api.StreamEventRequest.IFilter|null);
        }

        /** Represents a StreamEventRequest. */
        class StreamEventRequest implements IStreamEventRequest {

            /**
             * Constructs a new StreamEventRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IStreamEventRequest);

            /** StreamEventRequest filter. */
            public filter?: (api.StreamEventRequest.IFilter|null);
        }

        namespace StreamEventRequest {

            /** Properties of a Filter. */
            interface IFilter {

                /** Filter hash */
                hash?: (string|null);

                /** Filter instanceHash */
                instanceHash?: (string|null);

                /** Filter key */
                key?: (string|null);
            }

            /** Represents a Filter. */
            class Filter implements IFilter {

                /**
                 * Constructs a new Filter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.StreamEventRequest.IFilter);

                /** Filter hash. */
                public hash: string;

                /** Filter instanceHash. */
                public instanceHash: string;

                /** Filter key. */
                public key: string;
            }
        }

        /** Properties of a CreateEventRequest. */
        interface ICreateEventRequest {

            /** CreateEventRequest instanceHash */
            instanceHash?: (string|null);

            /** CreateEventRequest key */
            key?: (string|null);

            /** CreateEventRequest data */
            data?: (string|null);
        }

        /** Represents a CreateEventRequest. */
        class CreateEventRequest implements ICreateEventRequest {

            /**
             * Constructs a new CreateEventRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateEventRequest);

            /** CreateEventRequest instanceHash. */
            public instanceHash: string;

            /** CreateEventRequest key. */
            public key: string;

            /** CreateEventRequest data. */
            public data: string;
        }

        /** Properties of a CreateEventResponse. */
        interface ICreateEventResponse {

            /** CreateEventResponse hash */
            hash?: (string|null);
        }

        /** Represents a CreateEventResponse. */
        class CreateEventResponse implements ICreateEventResponse {

            /**
             * Constructs a new CreateEventResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateEventResponse);

            /** CreateEventResponse hash. */
            public hash: string;
        }
    }
}

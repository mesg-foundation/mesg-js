import * as $protobuf from "protobufjs";
export = mesg;

declare namespace mesg {


    /** Namespace types. */
    namespace types {

        /** Properties of an Event. */
        interface IEvent {

            /** Event hash */
            hash?: (Uint8Array|null);

            /** Event instanceHash */
            instanceHash?: (Uint8Array|null);

            /** Event key */
            key?: (string|null);

            /** Event data */
            data?: (google.protobuf.IStruct|null);
        }

        /** Represents an Event. */
        class Event implements IEvent {

            /**
             * Constructs a new Event.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IEvent);

            /** Event hash. */
            public hash: Uint8Array;

            /** Event instanceHash. */
            public instanceHash: Uint8Array;

            /** Event key. */
            public key: string;

            /** Event data. */
            public data?: (google.protobuf.IStruct|null);
        }
    }

    /** Namespace google. */
    namespace google {

        /** Namespace protobuf. */
        namespace protobuf {

            /** Properties of a Struct. */
            interface IStruct {

                /** Struct fields */
                fields?: ({ [k: string]: google.protobuf.IValue }|null);
            }

            /** Represents a Struct. */
            class Struct implements IStruct {

                /**
                 * Constructs a new Struct.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IStruct);

                /** Struct fields. */
                public fields: { [k: string]: google.protobuf.IValue };
            }

            /** Properties of a Value. */
            interface IValue {

                /** Value nullValue */
                nullValue?: (google.protobuf.NullValue|null);

                /** Value numberValue */
                numberValue?: (number|null);

                /** Value stringValue */
                stringValue?: (string|null);

                /** Value boolValue */
                boolValue?: (boolean|null);

                /** Value structValue */
                structValue?: (google.protobuf.IStruct|null);

                /** Value listValue */
                listValue?: (google.protobuf.IListValue|null);
            }

            /** Represents a Value. */
            class Value implements IValue {

                /**
                 * Constructs a new Value.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IValue);

                /** Value nullValue. */
                public nullValue: google.protobuf.NullValue;

                /** Value numberValue. */
                public numberValue: number;

                /** Value stringValue. */
                public stringValue: string;

                /** Value boolValue. */
                public boolValue: boolean;

                /** Value structValue. */
                public structValue?: (google.protobuf.IStruct|null);

                /** Value listValue. */
                public listValue?: (google.protobuf.IListValue|null);

                /** Value kind. */
                public kind?: ("nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue");
            }

            /** NullValue enum. */
            enum NullValue {
                NULL_VALUE = 0
            }

            /** Properties of a ListValue. */
            interface IListValue {

                /** ListValue values */
                values?: (google.protobuf.IValue[]|null);
            }

            /** Represents a ListValue. */
            class ListValue implements IListValue {

                /**
                 * Constructs a new ListValue.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IListValue);

                /** ListValue values. */
                public values: google.protobuf.IValue[];
            }
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
                hash?: (Uint8Array|null);

                /** Filter instanceHash */
                instanceHash?: (Uint8Array|null);

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
                public hash: Uint8Array;

                /** Filter instanceHash. */
                public instanceHash: Uint8Array;

                /** Filter key. */
                public key: string;
            }
        }

        /** Properties of a CreateEventRequest. */
        interface ICreateEventRequest {

            /** CreateEventRequest instanceHash */
            instanceHash?: (Uint8Array|null);

            /** CreateEventRequest key */
            key?: (string|null);

            /** CreateEventRequest data */
            data?: (google.protobuf.IStruct|null);
        }

        /** Represents a CreateEventRequest. */
        class CreateEventRequest implements ICreateEventRequest {

            /**
             * Constructs a new CreateEventRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateEventRequest);

            /** CreateEventRequest instanceHash. */
            public instanceHash: Uint8Array;

            /** CreateEventRequest key. */
            public key: string;

            /** CreateEventRequest data. */
            public data?: (google.protobuf.IStruct|null);
        }

        /** Properties of a CreateEventResponse. */
        interface ICreateEventResponse {

            /** CreateEventResponse hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a CreateEventResponse. */
        class CreateEventResponse implements ICreateEventResponse {

            /**
             * Constructs a new CreateEventResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateEventResponse);

            /** CreateEventResponse hash. */
            public hash: Uint8Array;
        }
    }
}

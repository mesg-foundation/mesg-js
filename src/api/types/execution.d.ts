import * as $protobuf from "protobufjs";
export = mesg;

declare namespace mesg {


    /** Namespace types. */
    namespace types {

        /** Status enum. */
        enum Status {
            Unknown = 0,
            Created = 1,
            InProgress = 2,
            Completed = 3,
            Failed = 4
        }

        /** Properties of an Execution. */
        interface IExecution {

            /** Execution hash */
            hash?: (string|null);

            /** Execution parentHash */
            parentHash?: (string|null);

            /** Execution eventHash */
            eventHash?: (string|null);

            /** Execution status */
            status?: (types.Status|null);

            /** Execution instanceHash */
            instanceHash?: (string|null);

            /** Execution taskKey */
            taskKey?: (string|null);

            /** Execution inputs */
            inputs?: (string|null);

            /** Execution outputs */
            outputs?: (string|null);

            /** Execution error */
            error?: (string|null);

            /** Execution tags */
            tags?: (string[]|null);
        }

        /** Represents an Execution. */
        class Execution implements IExecution {

            /**
             * Constructs a new Execution.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IExecution);

            /** Execution hash. */
            public hash: string;

            /** Execution parentHash. */
            public parentHash: string;

            /** Execution eventHash. */
            public eventHash: string;

            /** Execution status. */
            public status: types.Status;

            /** Execution instanceHash. */
            public instanceHash: string;

            /** Execution taskKey. */
            public taskKey: string;

            /** Execution inputs. */
            public inputs: string;

            /** Execution outputs. */
            public outputs: string;

            /** Execution error. */
            public error: string;

            /** Execution tags. */
            public tags: string[];
        }
    }

    /** Namespace api. */
    namespace api {

        /** Represents an Execution */
        class Execution extends $protobuf.rpc.Service {

            /**
             * Constructs a new Execution service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Create.
             * @param request CreateExecutionRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateExecutionResponse
             */
            public create(request: api.ICreateExecutionRequest, callback: api.Execution.CreateCallback): void;

            /**
             * Calls Create.
             * @param request CreateExecutionRequest message or plain object
             * @returns Promise
             */
            public create(request: api.ICreateExecutionRequest): Promise<api.CreateExecutionResponse>;

            /**
             * Calls Get.
             * @param request GetExecutionRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Execution
             */
            public get(request: api.IGetExecutionRequest, callback: api.Execution.GetCallback): void;

            /**
             * Calls Get.
             * @param request GetExecutionRequest message or plain object
             * @returns Promise
             */
            public get(request: api.IGetExecutionRequest): Promise<types.Execution>;

            /**
             * Calls Stream.
             * @param request StreamExecutionRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Execution
             */
            public stream(request: api.IStreamExecutionRequest, callback: api.Execution.StreamCallback): void;

            /**
             * Calls Stream.
             * @param request StreamExecutionRequest message or plain object
             * @returns Promise
             */
            public stream(request: api.IStreamExecutionRequest): Promise<types.Execution>;

            /**
             * Calls Update.
             * @param request UpdateExecutionRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and UpdateExecutionResponse
             */
            public update(request: api.IUpdateExecutionRequest, callback: api.Execution.UpdateCallback): void;

            /**
             * Calls Update.
             * @param request UpdateExecutionRequest message or plain object
             * @returns Promise
             */
            public update(request: api.IUpdateExecutionRequest): Promise<api.UpdateExecutionResponse>;
        }

        namespace Execution {

            /**
             * Callback as used by {@link api.Execution#create}.
             * @param error Error, if any
             * @param [response] CreateExecutionResponse
             */
            type CreateCallback = (error: (Error|null), response?: api.CreateExecutionResponse) => void;

            /**
             * Callback as used by {@link api.Execution#get}.
             * @param error Error, if any
             * @param [response] Execution
             */
            type GetCallback = (error: (Error|null), response?: types.Execution) => void;

            /**
             * Callback as used by {@link api.Execution#stream}.
             * @param error Error, if any
             * @param [response] Execution
             */
            type StreamCallback = (error: (Error|null), response?: types.Execution) => void;

            /**
             * Callback as used by {@link api.Execution#update}.
             * @param error Error, if any
             * @param [response] UpdateExecutionResponse
             */
            type UpdateCallback = (error: (Error|null), response?: api.UpdateExecutionResponse) => void;
        }

        /** Properties of a CreateExecutionRequest. */
        interface ICreateExecutionRequest {

            /** CreateExecutionRequest instanceHash */
            instanceHash?: (string|null);

            /** CreateExecutionRequest taskKey */
            taskKey?: (string|null);

            /** CreateExecutionRequest inputs */
            inputs?: (string|null);

            /** CreateExecutionRequest tags */
            tags?: (string[]|null);
        }

        /** Represents a CreateExecutionRequest. */
        class CreateExecutionRequest implements ICreateExecutionRequest {

            /**
             * Constructs a new CreateExecutionRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateExecutionRequest);

            /** CreateExecutionRequest instanceHash. */
            public instanceHash: string;

            /** CreateExecutionRequest taskKey. */
            public taskKey: string;

            /** CreateExecutionRequest inputs. */
            public inputs: string;

            /** CreateExecutionRequest tags. */
            public tags: string[];
        }

        /** Properties of a CreateExecutionResponse. */
        interface ICreateExecutionResponse {

            /** CreateExecutionResponse hash */
            hash?: (string|null);
        }

        /** Represents a CreateExecutionResponse. */
        class CreateExecutionResponse implements ICreateExecutionResponse {

            /**
             * Constructs a new CreateExecutionResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateExecutionResponse);

            /** CreateExecutionResponse hash. */
            public hash: string;
        }

        /** Properties of a GetExecutionRequest. */
        interface IGetExecutionRequest {

            /** GetExecutionRequest hash */
            hash?: (string|null);
        }

        /** Represents a GetExecutionRequest. */
        class GetExecutionRequest implements IGetExecutionRequest {

            /**
             * Constructs a new GetExecutionRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IGetExecutionRequest);

            /** GetExecutionRequest hash. */
            public hash: string;
        }

        /** Properties of a StreamExecutionRequest. */
        interface IStreamExecutionRequest {

            /** StreamExecutionRequest filter */
            filter?: (api.StreamExecutionRequest.IFilter|null);
        }

        /** Represents a StreamExecutionRequest. */
        class StreamExecutionRequest implements IStreamExecutionRequest {

            /**
             * Constructs a new StreamExecutionRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IStreamExecutionRequest);

            /** StreamExecutionRequest filter. */
            public filter?: (api.StreamExecutionRequest.IFilter|null);
        }

        namespace StreamExecutionRequest {

            /** Properties of a Filter. */
            interface IFilter {

                /** Filter statuses */
                statuses?: (types.Status[]|null);

                /** Filter instanceHash */
                instanceHash?: (string|null);

                /** Filter taskKey */
                taskKey?: (string|null);

                /** Filter tags */
                tags?: (string[]|null);
            }

            /** Represents a Filter. */
            class Filter implements IFilter {

                /**
                 * Constructs a new Filter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.StreamExecutionRequest.IFilter);

                /** Filter statuses. */
                public statuses: types.Status[];

                /** Filter instanceHash. */
                public instanceHash: string;

                /** Filter taskKey. */
                public taskKey: string;

                /** Filter tags. */
                public tags: string[];
            }
        }

        /** Properties of an UpdateExecutionRequest. */
        interface IUpdateExecutionRequest {

            /** UpdateExecutionRequest hash */
            hash?: (string|null);

            /** UpdateExecutionRequest outputs */
            outputs?: (string|null);

            /** UpdateExecutionRequest error */
            error?: (string|null);
        }

        /** Represents an UpdateExecutionRequest. */
        class UpdateExecutionRequest implements IUpdateExecutionRequest {

            /**
             * Constructs a new UpdateExecutionRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IUpdateExecutionRequest);

            /** UpdateExecutionRequest hash. */
            public hash: string;

            /** UpdateExecutionRequest outputs. */
            public outputs: string;

            /** UpdateExecutionRequest error. */
            public error: string;

            /** UpdateExecutionRequest result. */
            public result?: ("outputs"|"error");
        }

        /** Properties of an UpdateExecutionResponse. */
        interface IUpdateExecutionResponse {
        }

        /** Represents an UpdateExecutionResponse. */
        class UpdateExecutionResponse implements IUpdateExecutionResponse {

            /**
             * Constructs a new UpdateExecutionResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IUpdateExecutionResponse);
        }
    }
}

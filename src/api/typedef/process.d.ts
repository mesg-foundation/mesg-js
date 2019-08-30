import * as $protobuf from "protobufjs";
export = mesg;

declare namespace mesg {


    /** Namespace types. */
    namespace types {

        /** Properties of a Process. */
        interface IProcess {

            /** Process hash */
            hash?: (Uint8Array|null);

            /** Process key */
            key?: (string|null);

            /** Process nodes */
            nodes?: (types.Process.INode[]|null);

            /** Process edges */
            edges?: (types.Process.IEdge[]|null);
        }

        /** Represents a Process. */
        class Process implements IProcess {

            /**
             * Constructs a new Process.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IProcess);

            /** Process hash. */
            public hash: Uint8Array;

            /** Process key. */
            public key: string;

            /** Process nodes. */
            public nodes: types.Process.INode[];

            /** Process edges. */
            public edges: types.Process.IEdge[];
        }

        namespace Process {

            /** Properties of a Node. */
            interface INode {

                /** Node result */
                result?: (types.Process.Node.IResult|null);

                /** Node event */
                event?: (types.Process.Node.IEvent|null);

                /** Node task */
                task?: (types.Process.Node.ITask|null);

                /** Node map */
                map?: (types.Process.Node.IMap|null);

                /** Node filter */
                filter?: (types.Process.Node.IFilter|null);
            }

            /** Represents a Node. */
            class Node implements INode {

                /**
                 * Constructs a new Node.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Process.INode);

                /** Node result. */
                public result?: (types.Process.Node.IResult|null);

                /** Node event. */
                public event?: (types.Process.Node.IEvent|null);

                /** Node task. */
                public task?: (types.Process.Node.ITask|null);

                /** Node map. */
                public map?: (types.Process.Node.IMap|null);

                /** Node filter. */
                public filter?: (types.Process.Node.IFilter|null);

                /** Node type. */
                public type?: ("result"|"event"|"task"|"map"|"filter");
            }

            namespace Node {

                /** Properties of a Result. */
                interface IResult {

                    /** Result key */
                    key?: (string|null);

                    /** Result instanceHash */
                    instanceHash?: (Uint8Array|null);

                    /** Result taskKey */
                    taskKey?: (string|null);
                }

                /** Represents a Result. */
                class Result implements IResult {

                    /**
                     * Constructs a new Result.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: types.Process.Node.IResult);

                    /** Result key. */
                    public key: string;

                    /** Result instanceHash. */
                    public instanceHash: Uint8Array;

                    /** Result taskKey. */
                    public taskKey: string;
                }

                /** Properties of an Event. */
                interface IEvent {

                    /** Event key */
                    key?: (string|null);

                    /** Event instanceHash */
                    instanceHash?: (Uint8Array|null);

                    /** Event eventKey */
                    eventKey?: (string|null);
                }

                /** Represents an Event. */
                class Event implements IEvent {

                    /**
                     * Constructs a new Event.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: types.Process.Node.IEvent);

                    /** Event key. */
                    public key: string;

                    /** Event instanceHash. */
                    public instanceHash: Uint8Array;

                    /** Event eventKey. */
                    public eventKey: string;
                }

                /** Properties of a Task. */
                interface ITask {

                    /** Task key */
                    key?: (string|null);

                    /** Task instanceHash */
                    instanceHash?: (Uint8Array|null);

                    /** Task taskKey */
                    taskKey?: (string|null);
                }

                /** Represents a Task. */
                class Task implements ITask {

                    /**
                     * Constructs a new Task.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: types.Process.Node.ITask);

                    /** Task key. */
                    public key: string;

                    /** Task instanceHash. */
                    public instanceHash: Uint8Array;

                    /** Task taskKey. */
                    public taskKey: string;
                }

                /** Properties of a Map. */
                interface IMap {

                    /** Map key */
                    key?: (string|null);

                    /** Map outputs */
                    outputs?: (types.Process.Node.Map.IOutput[]|null);
                }

                /** Represents a Map. */
                class Map implements IMap {

                    /**
                     * Constructs a new Map.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: types.Process.Node.IMap);

                    /** Map key. */
                    public key: string;

                    /** Map outputs. */
                    public outputs: types.Process.Node.Map.IOutput[];
                }

                namespace Map {

                    /** Properties of an Output. */
                    interface IOutput {

                        /** Output key */
                        key?: (string|null);

                        /** Output ref */
                        ref?: (types.Process.Node.Map.Output.IReference|null);
                    }

                    /** Represents an Output. */
                    class Output implements IOutput {

                        /**
                         * Constructs a new Output.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: types.Process.Node.Map.IOutput);

                        /** Output key. */
                        public key: string;

                        /** Output ref. */
                        public ref?: (types.Process.Node.Map.Output.IReference|null);

                        /** Output value. */
                        public value?: "ref";
                    }

                    namespace Output {

                        /** Properties of a Reference. */
                        interface IReference {

                            /** Reference nodeKey */
                            nodeKey?: (string|null);

                            /** Reference key */
                            key?: (string|null);
                        }

                        /** Represents a Reference. */
                        class Reference implements IReference {

                            /**
                             * Constructs a new Reference.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: types.Process.Node.Map.Output.IReference);

                            /** Reference nodeKey. */
                            public nodeKey: string;

                            /** Reference key. */
                            public key: string;
                        }
                    }
                }

                /** Properties of a Filter. */
                interface IFilter {

                    /** Filter key */
                    key?: (string|null);

                    /** Filter conditions */
                    conditions?: (types.Process.Node.Filter.ICondition[]|null);
                }

                /** Represents a Filter. */
                class Filter implements IFilter {

                    /**
                     * Constructs a new Filter.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: types.Process.Node.IFilter);

                    /** Filter key. */
                    public key: string;

                    /** Filter conditions. */
                    public conditions: types.Process.Node.Filter.ICondition[];
                }

                namespace Filter {

                    /** Properties of a Condition. */
                    interface ICondition {

                        /** Condition key */
                        key?: (string|null);

                        /** Condition predicate */
                        predicate?: (types.Process.Node.Filter.Condition.Predicate|null);

                        /** Condition value */
                        value?: (string|null);
                    }

                    /** Represents a Condition. */
                    class Condition implements ICondition {

                        /**
                         * Constructs a new Condition.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: types.Process.Node.Filter.ICondition);

                        /** Condition key. */
                        public key: string;

                        /** Condition predicate. */
                        public predicate: types.Process.Node.Filter.Condition.Predicate;

                        /** Condition value. */
                        public value: string;
                    }

                    namespace Condition {

                        /** Predicate enum. */
                        enum Predicate {
                            Unknown = 0,
                            EQ = 1
                        }
                    }
                }
            }

            /** Properties of an Edge. */
            interface IEdge {

                /** Edge src */
                src?: (string|null);

                /** Edge dst */
                dst?: (string|null);
            }

            /** Represents an Edge. */
            class Edge implements IEdge {

                /**
                 * Constructs a new Edge.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Process.IEdge);

                /** Edge src. */
                public src: string;

                /** Edge dst. */
                public dst: string;
            }
        }
    }

    /** Namespace api. */
    namespace api {

        /** Represents a Process */
        class Process extends $protobuf.rpc.Service {

            /**
             * Constructs a new Process service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Create.
             * @param request CreateProcessRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateProcessResponse
             */
            public create(request: api.ICreateProcessRequest, callback: api.Process.CreateCallback): void;

            /**
             * Calls Create.
             * @param request CreateProcessRequest message or plain object
             * @returns Promise
             */
            public create(request: api.ICreateProcessRequest): Promise<api.CreateProcessResponse>;

            /**
             * Calls Delete.
             * @param request DeleteProcessRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and DeleteProcessResponse
             */
            public delete(request: api.IDeleteProcessRequest, callback: api.Process.DeleteCallback): void;

            /**
             * Calls Delete.
             * @param request DeleteProcessRequest message or plain object
             * @returns Promise
             */
            public delete(request: api.IDeleteProcessRequest): Promise<api.DeleteProcessResponse>;

            /**
             * Calls Get.
             * @param request GetProcessRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Process
             */
            public get(request: api.IGetProcessRequest, callback: api.Process.GetCallback): void;

            /**
             * Calls Get.
             * @param request GetProcessRequest message or plain object
             * @returns Promise
             */
            public get(request: api.IGetProcessRequest): Promise<types.Process>;

            /**
             * Calls List.
             * @param request ListProcessRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ListProcessResponse
             */
            public list(request: api.IListProcessRequest, callback: api.Process.ListCallback): void;

            /**
             * Calls List.
             * @param request ListProcessRequest message or plain object
             * @returns Promise
             */
            public list(request: api.IListProcessRequest): Promise<api.ListProcessResponse>;
        }

        namespace Process {

            /**
             * Callback as used by {@link api.Process#create}.
             * @param error Error, if any
             * @param [response] CreateProcessResponse
             */
            type CreateCallback = (error: (Error|null), response?: api.CreateProcessResponse) => void;

            /**
             * Callback as used by {@link api.Process#delete_}.
             * @param error Error, if any
             * @param [response] DeleteProcessResponse
             */
            type DeleteCallback = (error: (Error|null), response?: api.DeleteProcessResponse) => void;

            /**
             * Callback as used by {@link api.Process#get}.
             * @param error Error, if any
             * @param [response] Process
             */
            type GetCallback = (error: (Error|null), response?: types.Process) => void;

            /**
             * Callback as used by {@link api.Process#list}.
             * @param error Error, if any
             * @param [response] ListProcessResponse
             */
            type ListCallback = (error: (Error|null), response?: api.ListProcessResponse) => void;
        }

        /** Properties of a CreateProcessRequest. */
        interface ICreateProcessRequest {

            /** CreateProcessRequest key */
            key?: (string|null);

            /** CreateProcessRequest nodes */
            nodes?: (types.Process.INode[]|null);

            /** CreateProcessRequest edges */
            edges?: (types.Process.IEdge[]|null);
        }

        /** Represents a CreateProcessRequest. */
        class CreateProcessRequest implements ICreateProcessRequest {

            /**
             * Constructs a new CreateProcessRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateProcessRequest);

            /** CreateProcessRequest key. */
            public key: string;

            /** CreateProcessRequest nodes. */
            public nodes: types.Process.INode[];

            /** CreateProcessRequest edges. */
            public edges: types.Process.IEdge[];
        }

        /** Properties of a CreateProcessResponse. */
        interface ICreateProcessResponse {

            /** CreateProcessResponse hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a CreateProcessResponse. */
        class CreateProcessResponse implements ICreateProcessResponse {

            /**
             * Constructs a new CreateProcessResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateProcessResponse);

            /** CreateProcessResponse hash. */
            public hash: Uint8Array;
        }

        /** Properties of a DeleteProcessRequest. */
        interface IDeleteProcessRequest {

            /** DeleteProcessRequest hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a DeleteProcessRequest. */
        class DeleteProcessRequest implements IDeleteProcessRequest {

            /**
             * Constructs a new DeleteProcessRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IDeleteProcessRequest);

            /** DeleteProcessRequest hash. */
            public hash: Uint8Array;
        }

        /** Properties of a DeleteProcessResponse. */
        interface IDeleteProcessResponse {
        }

        /** Represents a DeleteProcessResponse. */
        class DeleteProcessResponse implements IDeleteProcessResponse {

            /**
             * Constructs a new DeleteProcessResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IDeleteProcessResponse);
        }

        /** Properties of a GetProcessRequest. */
        interface IGetProcessRequest {

            /** GetProcessRequest hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a GetProcessRequest. */
        class GetProcessRequest implements IGetProcessRequest {

            /**
             * Constructs a new GetProcessRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IGetProcessRequest);

            /** GetProcessRequest hash. */
            public hash: Uint8Array;
        }

        /** Properties of a ListProcessRequest. */
        interface IListProcessRequest {
        }

        /** Represents a ListProcessRequest. */
        class ListProcessRequest implements IListProcessRequest {

            /**
             * Constructs a new ListProcessRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IListProcessRequest);
        }

        /** Properties of a ListProcessResponse. */
        interface IListProcessResponse {

            /** ListProcessResponse processes */
            processes?: (types.IProcess[]|null);
        }

        /** Represents a ListProcessResponse. */
        class ListProcessResponse implements IListProcessResponse {

            /**
             * Constructs a new ListProcessResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IListProcessResponse);

            /** ListProcessResponse processes. */
            public processes: types.IProcess[];
        }
    }
}

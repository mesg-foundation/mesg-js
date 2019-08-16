import * as $protobuf from "protobufjs";
export = mesg;

declare namespace mesg {


    /** Namespace types. */
    namespace types {

        /** Properties of a Workflow. */
        interface IWorkflow {

            /** Workflow hash */
            hash?: (string|null);

            /** Workflow key */
            key?: (string|null);

            /** Workflow trigger */
            trigger?: (types.Workflow.ITrigger|null);

            /** Workflow nodes */
            nodes?: (types.Workflow.INode[]|null);

            /** Workflow edges */
            edges?: (types.Workflow.IEdge[]|null);
        }

        /** Represents a Workflow. */
        class Workflow implements IWorkflow {

            /**
             * Constructs a new Workflow.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IWorkflow);

            /** Workflow hash. */
            public hash: string;

            /** Workflow key. */
            public key: string;

            /** Workflow trigger. */
            public trigger?: (types.Workflow.ITrigger|null);

            /** Workflow nodes. */
            public nodes: types.Workflow.INode[];

            /** Workflow edges. */
            public edges: types.Workflow.IEdge[];
        }

        namespace Workflow {

            /** Properties of a Trigger. */
            interface ITrigger {

                /** Trigger instanceHash */
                instanceHash?: (string|null);

                /** Trigger taskKey */
                taskKey?: (string|null);

                /** Trigger eventKey */
                eventKey?: (string|null);

                /** Trigger filters */
                filters?: (types.Workflow.Trigger.IFilter[]|null);

                /** Trigger nodeKey */
                nodeKey?: (string|null);
            }

            /** Represents a Trigger. */
            class Trigger implements ITrigger {

                /**
                 * Constructs a new Trigger.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Workflow.ITrigger);

                /** Trigger instanceHash. */
                public instanceHash: string;

                /** Trigger taskKey. */
                public taskKey: string;

                /** Trigger eventKey. */
                public eventKey: string;

                /** Trigger filters. */
                public filters: types.Workflow.Trigger.IFilter[];

                /** Trigger nodeKey. */
                public nodeKey: string;

                /** Trigger key. */
                public key?: ("taskKey"|"eventKey");
            }

            namespace Trigger {

                /** Properties of a Filter. */
                interface IFilter {

                    /** Filter key */
                    key?: (string|null);

                    /** Filter predicate */
                    predicate?: (types.Workflow.Trigger.Filter.Predicate|null);

                    /** Filter value */
                    value?: (string|null);
                }

                /** Represents a Filter. */
                class Filter implements IFilter {

                    /**
                     * Constructs a new Filter.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: types.Workflow.Trigger.IFilter);

                    /** Filter key. */
                    public key: string;

                    /** Filter predicate. */
                    public predicate: types.Workflow.Trigger.Filter.Predicate;

                    /** Filter value. */
                    public value: string;
                }

                namespace Filter {

                    /** Predicate enum. */
                    enum Predicate {
                        Unknown = 0,
                        EQ = 1
                    }
                }
            }

            /** Properties of a Node. */
            interface INode {

                /** Node key */
                key?: (string|null);

                /** Node instanceHash */
                instanceHash?: (string|null);

                /** Node taskKey */
                taskKey?: (string|null);
            }

            /** Represents a Node. */
            class Node implements INode {

                /**
                 * Constructs a new Node.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Workflow.INode);

                /** Node key. */
                public key: string;

                /** Node instanceHash. */
                public instanceHash: string;

                /** Node taskKey. */
                public taskKey: string;
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
                constructor(properties?: types.Workflow.IEdge);

                /** Edge src. */
                public src: string;

                /** Edge dst. */
                public dst: string;
            }
        }
    }

    /** Namespace api. */
    namespace api {

        /** Represents a Workflow */
        class Workflow extends $protobuf.rpc.Service {

            /**
             * Constructs a new Workflow service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Create.
             * @param request CreateWorkflowRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateWorkflowResponse
             */
            public create(request: api.ICreateWorkflowRequest, callback: api.Workflow.CreateCallback): void;

            /**
             * Calls Create.
             * @param request CreateWorkflowRequest message or plain object
             * @returns Promise
             */
            public create(request: api.ICreateWorkflowRequest): Promise<api.CreateWorkflowResponse>;

            /**
             * Calls Delete.
             * @param request DeleteWorkflowRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and DeleteWorkflowResponse
             */
            public delete(request: api.IDeleteWorkflowRequest, callback: api.Workflow.DeleteCallback): void;

            /**
             * Calls Delete.
             * @param request DeleteWorkflowRequest message or plain object
             * @returns Promise
             */
            public delete(request: api.IDeleteWorkflowRequest): Promise<api.DeleteWorkflowResponse>;

            /**
             * Calls Get.
             * @param request GetWorkflowRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Workflow
             */
            public get(request: api.IGetWorkflowRequest, callback: api.Workflow.GetCallback): void;

            /**
             * Calls Get.
             * @param request GetWorkflowRequest message or plain object
             * @returns Promise
             */
            public get(request: api.IGetWorkflowRequest): Promise<types.Workflow>;

            /**
             * Calls List.
             * @param request ListWorkflowRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ListWorkflowResponse
             */
            public list(request: api.IListWorkflowRequest, callback: api.Workflow.ListCallback): void;

            /**
             * Calls List.
             * @param request ListWorkflowRequest message or plain object
             * @returns Promise
             */
            public list(request: api.IListWorkflowRequest): Promise<api.ListWorkflowResponse>;
        }

        namespace Workflow {

            /**
             * Callback as used by {@link api.Workflow#create}.
             * @param error Error, if any
             * @param [response] CreateWorkflowResponse
             */
            type CreateCallback = (error: (Error|null), response?: api.CreateWorkflowResponse) => void;

            /**
             * Callback as used by {@link api.Workflow#delete_}.
             * @param error Error, if any
             * @param [response] DeleteWorkflowResponse
             */
            type DeleteCallback = (error: (Error|null), response?: api.DeleteWorkflowResponse) => void;

            /**
             * Callback as used by {@link api.Workflow#get}.
             * @param error Error, if any
             * @param [response] Workflow
             */
            type GetCallback = (error: (Error|null), response?: types.Workflow) => void;

            /**
             * Callback as used by {@link api.Workflow#list}.
             * @param error Error, if any
             * @param [response] ListWorkflowResponse
             */
            type ListCallback = (error: (Error|null), response?: api.ListWorkflowResponse) => void;
        }

        /** Properties of a CreateWorkflowRequest. */
        interface ICreateWorkflowRequest {

            /** CreateWorkflowRequest key */
            key?: (string|null);

            /** CreateWorkflowRequest trigger */
            trigger?: (types.Workflow.ITrigger|null);

            /** CreateWorkflowRequest nodes */
            nodes?: (types.Workflow.INode[]|null);

            /** CreateWorkflowRequest edges */
            edges?: (types.Workflow.IEdge[]|null);
        }

        /** Represents a CreateWorkflowRequest. */
        class CreateWorkflowRequest implements ICreateWorkflowRequest {

            /**
             * Constructs a new CreateWorkflowRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateWorkflowRequest);

            /** CreateWorkflowRequest key. */
            public key: string;

            /** CreateWorkflowRequest trigger. */
            public trigger?: (types.Workflow.ITrigger|null);

            /** CreateWorkflowRequest nodes. */
            public nodes: types.Workflow.INode[];

            /** CreateWorkflowRequest edges. */
            public edges: types.Workflow.IEdge[];
        }

        /** Properties of a CreateWorkflowResponse. */
        interface ICreateWorkflowResponse {

            /** CreateWorkflowResponse hash */
            hash?: (string|null);
        }

        /** Represents a CreateWorkflowResponse. */
        class CreateWorkflowResponse implements ICreateWorkflowResponse {

            /**
             * Constructs a new CreateWorkflowResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateWorkflowResponse);

            /** CreateWorkflowResponse hash. */
            public hash: string;
        }

        /** Properties of a DeleteWorkflowRequest. */
        interface IDeleteWorkflowRequest {

            /** DeleteWorkflowRequest hash */
            hash?: (string|null);
        }

        /** Represents a DeleteWorkflowRequest. */
        class DeleteWorkflowRequest implements IDeleteWorkflowRequest {

            /**
             * Constructs a new DeleteWorkflowRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IDeleteWorkflowRequest);

            /** DeleteWorkflowRequest hash. */
            public hash: string;
        }

        /** Properties of a DeleteWorkflowResponse. */
        interface IDeleteWorkflowResponse {
        }

        /** Represents a DeleteWorkflowResponse. */
        class DeleteWorkflowResponse implements IDeleteWorkflowResponse {

            /**
             * Constructs a new DeleteWorkflowResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IDeleteWorkflowResponse);
        }

        /** Properties of a GetWorkflowRequest. */
        interface IGetWorkflowRequest {

            /** GetWorkflowRequest hash */
            hash?: (string|null);
        }

        /** Represents a GetWorkflowRequest. */
        class GetWorkflowRequest implements IGetWorkflowRequest {

            /**
             * Constructs a new GetWorkflowRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IGetWorkflowRequest);

            /** GetWorkflowRequest hash. */
            public hash: string;
        }

        /** Properties of a ListWorkflowRequest. */
        interface IListWorkflowRequest {
        }

        /** Represents a ListWorkflowRequest. */
        class ListWorkflowRequest implements IListWorkflowRequest {

            /**
             * Constructs a new ListWorkflowRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IListWorkflowRequest);
        }

        /** Properties of a ListWorkflowResponse. */
        interface IListWorkflowResponse {

            /** ListWorkflowResponse workflows */
            workflows?: (types.IWorkflow[]|null);
        }

        /** Represents a ListWorkflowResponse. */
        class ListWorkflowResponse implements IListWorkflowResponse {

            /**
             * Constructs a new ListWorkflowResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IListWorkflowResponse);

            /** ListWorkflowResponse workflows. */
            public workflows: types.IWorkflow[];
        }
    }
}

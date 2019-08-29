import * as $protobuf from "protobufjs";
export = mesg;

declare namespace mesg {


    /** Namespace types. */
    namespace types {

        /** Properties of a Service. */
        interface IService {

            /** Service hash */
            hash?: (Uint8Array|null);

            /** Service sid */
            sid?: (string|null);

            /** Service name */
            name?: (string|null);

            /** Service description */
            description?: (string|null);

            /** Service configuration */
            configuration?: (types.Service.IConfiguration|null);

            /** Service tasks */
            tasks?: (types.Service.ITask[]|null);

            /** Service events */
            events?: (types.Service.IEvent[]|null);

            /** Service dependencies */
            dependencies?: (types.Service.IDependency[]|null);

            /** Service repository */
            repository?: (string|null);

            /** Service source */
            source?: (string|null);
        }

        /** Represents a Service. */
        class Service implements IService {

            /**
             * Constructs a new Service.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IService);

            /** Service hash. */
            public hash: Uint8Array;

            /** Service sid. */
            public sid: string;

            /** Service name. */
            public name: string;

            /** Service description. */
            public description: string;

            /** Service configuration. */
            public configuration?: (types.Service.IConfiguration|null);

            /** Service tasks. */
            public tasks: types.Service.ITask[];

            /** Service events. */
            public events: types.Service.IEvent[];

            /** Service dependencies. */
            public dependencies: types.Service.IDependency[];

            /** Service repository. */
            public repository: string;

            /** Service source. */
            public source: string;
        }

        namespace Service {

            /** Properties of an Event. */
            interface IEvent {

                /** Event key */
                key?: (string|null);

                /** Event name */
                name?: (string|null);

                /** Event description */
                description?: (string|null);

                /** Event data */
                data?: (types.Service.IParameter[]|null);
            }

            /** Represents an Event. */
            class Event implements IEvent {

                /**
                 * Constructs a new Event.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Service.IEvent);

                /** Event key. */
                public key: string;

                /** Event name. */
                public name: string;

                /** Event description. */
                public description: string;

                /** Event data. */
                public data: types.Service.IParameter[];
            }

            /** Properties of a Task. */
            interface ITask {

                /** Task key */
                key?: (string|null);

                /** Task name */
                name?: (string|null);

                /** Task description */
                description?: (string|null);

                /** Task inputs */
                inputs?: (types.Service.IParameter[]|null);

                /** Task outputs */
                outputs?: (types.Service.IParameter[]|null);
            }

            /** Represents a Task. */
            class Task implements ITask {

                /**
                 * Constructs a new Task.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Service.ITask);

                /** Task key. */
                public key: string;

                /** Task name. */
                public name: string;

                /** Task description. */
                public description: string;

                /** Task inputs. */
                public inputs: types.Service.IParameter[];

                /** Task outputs. */
                public outputs: types.Service.IParameter[];
            }

            /** Properties of a Parameter. */
            interface IParameter {

                /** Parameter key */
                key?: (string|null);

                /** Parameter name */
                name?: (string|null);

                /** Parameter description */
                description?: (string|null);

                /** Parameter type */
                type?: (string|null);

                /** Parameter optional */
                optional?: (boolean|null);

                /** Parameter repeated */
                repeated?: (boolean|null);

                /** Parameter object */
                object?: (types.Service.IParameter[]|null);
            }

            /** Represents a Parameter. */
            class Parameter implements IParameter {

                /**
                 * Constructs a new Parameter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Service.IParameter);

                /** Parameter key. */
                public key: string;

                /** Parameter name. */
                public name: string;

                /** Parameter description. */
                public description: string;

                /** Parameter type. */
                public type: string;

                /** Parameter optional. */
                public optional: boolean;

                /** Parameter repeated. */
                public repeated: boolean;

                /** Parameter object. */
                public object: types.Service.IParameter[];
            }

            /** Properties of a Configuration. */
            interface IConfiguration {

                /** Configuration volumes */
                volumes?: (string[]|null);

                /** Configuration volumesFrom */
                volumesFrom?: (string[]|null);

                /** Configuration ports */
                ports?: (string[]|null);

                /** Configuration args */
                args?: (string[]|null);

                /** Configuration command */
                command?: (string|null);

                /** Configuration env */
                env?: (string[]|null);
            }

            /** Represents a Configuration. */
            class Configuration implements IConfiguration {

                /**
                 * Constructs a new Configuration.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Service.IConfiguration);

                /** Configuration volumes. */
                public volumes: string[];

                /** Configuration volumesFrom. */
                public volumesFrom: string[];

                /** Configuration ports. */
                public ports: string[];

                /** Configuration args. */
                public args: string[];

                /** Configuration command. */
                public command: string;

                /** Configuration env. */
                public env: string[];
            }

            /** Properties of a Dependency. */
            interface IDependency {

                /** Dependency key */
                key?: (string|null);

                /** Dependency image */
                image?: (string|null);

                /** Dependency volumes */
                volumes?: (string[]|null);

                /** Dependency volumesFrom */
                volumesFrom?: (string[]|null);

                /** Dependency ports */
                ports?: (string[]|null);

                /** Dependency args */
                args?: (string[]|null);

                /** Dependency command */
                command?: (string|null);

                /** Dependency env */
                env?: (string[]|null);
            }

            /** Represents a Dependency. */
            class Dependency implements IDependency {

                /**
                 * Constructs a new Dependency.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: types.Service.IDependency);

                /** Dependency key. */
                public key: string;

                /** Dependency image. */
                public image: string;

                /** Dependency volumes. */
                public volumes: string[];

                /** Dependency volumesFrom. */
                public volumesFrom: string[];

                /** Dependency ports. */
                public ports: string[];

                /** Dependency args. */
                public args: string[];

                /** Dependency command. */
                public command: string;

                /** Dependency env. */
                public env: string[];
            }
        }
    }

    /** Namespace api. */
    namespace api {

        /** Represents a Service */
        class Service extends $protobuf.rpc.Service {

            /**
             * Constructs a new Service service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Create.
             * @param request CreateServiceRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateServiceResponse
             */
            public create(request: api.ICreateServiceRequest, callback: api.Service.CreateCallback): void;

            /**
             * Calls Create.
             * @param request CreateServiceRequest message or plain object
             * @returns Promise
             */
            public create(request: api.ICreateServiceRequest): Promise<api.CreateServiceResponse>;

            /**
             * Calls Delete.
             * @param request DeleteServiceRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and DeleteServiceResponse
             */
            public delete(request: api.IDeleteServiceRequest, callback: api.Service.DeleteCallback): void;

            /**
             * Calls Delete.
             * @param request DeleteServiceRequest message or plain object
             * @returns Promise
             */
            public delete(request: api.IDeleteServiceRequest): Promise<api.DeleteServiceResponse>;

            /**
             * Calls Get.
             * @param request GetServiceRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Service
             */
            public get(request: api.IGetServiceRequest, callback: api.Service.GetCallback): void;

            /**
             * Calls Get.
             * @param request GetServiceRequest message or plain object
             * @returns Promise
             */
            public get(request: api.IGetServiceRequest): Promise<types.Service>;

            /**
             * Calls List.
             * @param request ListServiceRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ListServiceResponse
             */
            public list(request: api.IListServiceRequest, callback: api.Service.ListCallback): void;

            /**
             * Calls List.
             * @param request ListServiceRequest message or plain object
             * @returns Promise
             */
            public list(request: api.IListServiceRequest): Promise<api.ListServiceResponse>;
        }

        namespace Service {

            /**
             * Callback as used by {@link api.Service#create}.
             * @param error Error, if any
             * @param [response] CreateServiceResponse
             */
            type CreateCallback = (error: (Error|null), response?: api.CreateServiceResponse) => void;

            /**
             * Callback as used by {@link api.Service#delete_}.
             * @param error Error, if any
             * @param [response] DeleteServiceResponse
             */
            type DeleteCallback = (error: (Error|null), response?: api.DeleteServiceResponse) => void;

            /**
             * Callback as used by {@link api.Service#get}.
             * @param error Error, if any
             * @param [response] Service
             */
            type GetCallback = (error: (Error|null), response?: types.Service) => void;

            /**
             * Callback as used by {@link api.Service#list}.
             * @param error Error, if any
             * @param [response] ListServiceResponse
             */
            type ListCallback = (error: (Error|null), response?: api.ListServiceResponse) => void;
        }

        /** Properties of a CreateServiceRequest. */
        interface ICreateServiceRequest {

            /** CreateServiceRequest sid */
            sid?: (string|null);

            /** CreateServiceRequest name */
            name?: (string|null);

            /** CreateServiceRequest description */
            description?: (string|null);

            /** CreateServiceRequest configuration */
            configuration?: (types.Service.IConfiguration|null);

            /** CreateServiceRequest tasks */
            tasks?: (types.Service.ITask[]|null);

            /** CreateServiceRequest events */
            events?: (types.Service.IEvent[]|null);

            /** CreateServiceRequest dependencies */
            dependencies?: (types.Service.IDependency[]|null);

            /** CreateServiceRequest repository */
            repository?: (string|null);

            /** CreateServiceRequest source */
            source?: (string|null);
        }

        /** Represents a CreateServiceRequest. */
        class CreateServiceRequest implements ICreateServiceRequest {

            /**
             * Constructs a new CreateServiceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateServiceRequest);

            /** CreateServiceRequest sid. */
            public sid: string;

            /** CreateServiceRequest name. */
            public name: string;

            /** CreateServiceRequest description. */
            public description: string;

            /** CreateServiceRequest configuration. */
            public configuration?: (types.Service.IConfiguration|null);

            /** CreateServiceRequest tasks. */
            public tasks: types.Service.ITask[];

            /** CreateServiceRequest events. */
            public events: types.Service.IEvent[];

            /** CreateServiceRequest dependencies. */
            public dependencies: types.Service.IDependency[];

            /** CreateServiceRequest repository. */
            public repository: string;

            /** CreateServiceRequest source. */
            public source: string;
        }

        /** Properties of a CreateServiceResponse. */
        interface ICreateServiceResponse {

            /** CreateServiceResponse hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a CreateServiceResponse. */
        class CreateServiceResponse implements ICreateServiceResponse {

            /**
             * Constructs a new CreateServiceResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateServiceResponse);

            /** CreateServiceResponse hash. */
            public hash: Uint8Array;
        }

        /** Properties of a DeleteServiceRequest. */
        interface IDeleteServiceRequest {

            /** DeleteServiceRequest hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a DeleteServiceRequest. */
        class DeleteServiceRequest implements IDeleteServiceRequest {

            /**
             * Constructs a new DeleteServiceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IDeleteServiceRequest);

            /** DeleteServiceRequest hash. */
            public hash: Uint8Array;
        }

        /** Properties of a DeleteServiceResponse. */
        interface IDeleteServiceResponse {
        }

        /** Represents a DeleteServiceResponse. */
        class DeleteServiceResponse implements IDeleteServiceResponse {

            /**
             * Constructs a new DeleteServiceResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IDeleteServiceResponse);
        }

        /** Properties of a GetServiceRequest. */
        interface IGetServiceRequest {

            /** GetServiceRequest hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a GetServiceRequest. */
        class GetServiceRequest implements IGetServiceRequest {

            /**
             * Constructs a new GetServiceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IGetServiceRequest);

            /** GetServiceRequest hash. */
            public hash: Uint8Array;
        }

        /** Properties of a ListServiceRequest. */
        interface IListServiceRequest {
        }

        /** Represents a ListServiceRequest. */
        class ListServiceRequest implements IListServiceRequest {

            /**
             * Constructs a new ListServiceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IListServiceRequest);
        }

        /** Properties of a ListServiceResponse. */
        interface IListServiceResponse {

            /** ListServiceResponse services */
            services?: (types.IService[]|null);
        }

        /** Represents a ListServiceResponse. */
        class ListServiceResponse implements IListServiceResponse {

            /**
             * Constructs a new ListServiceResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IListServiceResponse);

            /** ListServiceResponse services. */
            public services: types.IService[];
        }
    }
}

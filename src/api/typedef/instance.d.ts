import * as $protobuf from "protobufjs";
export = mesg;

declare namespace mesg {


    /** Namespace types. */
    namespace types {

        /** Properties of an Instance. */
        interface IInstance {

            /** Instance hash */
            hash?: (Uint8Array|null);

            /** Instance serviceHash */
            serviceHash?: (Uint8Array|null);
        }

        /** Represents an Instance. */
        class Instance implements IInstance {

            /**
             * Constructs a new Instance.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IInstance);

            /** Instance hash. */
            public hash: Uint8Array;

            /** Instance serviceHash. */
            public serviceHash: Uint8Array;
        }
    }

    /** Namespace api. */
    namespace api {

        /** Represents an Instance */
        class Instance extends $protobuf.rpc.Service {

            /**
             * Constructs a new Instance service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Get.
             * @param request GetInstanceRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Instance
             */
            public get(request: api.IGetInstanceRequest, callback: api.Instance.GetCallback): void;

            /**
             * Calls Get.
             * @param request GetInstanceRequest message or plain object
             * @returns Promise
             */
            public get(request: api.IGetInstanceRequest): Promise<types.Instance>;

            /**
             * Calls List.
             * @param request ListInstancesRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ListInstancesResponse
             */
            public list(request: api.IListInstancesRequest, callback: api.Instance.ListCallback): void;

            /**
             * Calls List.
             * @param request ListInstancesRequest message or plain object
             * @returns Promise
             */
            public list(request: api.IListInstancesRequest): Promise<api.ListInstancesResponse>;

            /**
             * Calls Create.
             * @param request CreateInstanceRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateInstanceResponse
             */
            public create(request: api.ICreateInstanceRequest, callback: api.Instance.CreateCallback): void;

            /**
             * Calls Create.
             * @param request CreateInstanceRequest message or plain object
             * @returns Promise
             */
            public create(request: api.ICreateInstanceRequest): Promise<api.CreateInstanceResponse>;

            /**
             * Calls Delete.
             * @param request DeleteInstanceRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and DeleteInstanceResponse
             */
            public delete(request: api.IDeleteInstanceRequest, callback: api.Instance.DeleteCallback): void;

            /**
             * Calls Delete.
             * @param request DeleteInstanceRequest message or plain object
             * @returns Promise
             */
            public delete(request: api.IDeleteInstanceRequest): Promise<api.DeleteInstanceResponse>;
        }

        namespace Instance {

            /**
             * Callback as used by {@link api.Instance#get}.
             * @param error Error, if any
             * @param [response] Instance
             */
            type GetCallback = (error: (Error|null), response?: types.Instance) => void;

            /**
             * Callback as used by {@link api.Instance#list}.
             * @param error Error, if any
             * @param [response] ListInstancesResponse
             */
            type ListCallback = (error: (Error|null), response?: api.ListInstancesResponse) => void;

            /**
             * Callback as used by {@link api.Instance#create}.
             * @param error Error, if any
             * @param [response] CreateInstanceResponse
             */
            type CreateCallback = (error: (Error|null), response?: api.CreateInstanceResponse) => void;

            /**
             * Callback as used by {@link api.Instance#delete_}.
             * @param error Error, if any
             * @param [response] DeleteInstanceResponse
             */
            type DeleteCallback = (error: (Error|null), response?: api.DeleteInstanceResponse) => void;
        }

        /** Properties of a GetInstanceRequest. */
        interface IGetInstanceRequest {

            /** GetInstanceRequest hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a GetInstanceRequest. */
        class GetInstanceRequest implements IGetInstanceRequest {

            /**
             * Constructs a new GetInstanceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IGetInstanceRequest);

            /** GetInstanceRequest hash. */
            public hash: Uint8Array;
        }

        /** Properties of a ListInstancesRequest. */
        interface IListInstancesRequest {

            /** ListInstancesRequest serviceHash */
            serviceHash?: (Uint8Array|null);
        }

        /** Represents a ListInstancesRequest. */
        class ListInstancesRequest implements IListInstancesRequest {

            /**
             * Constructs a new ListInstancesRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IListInstancesRequest);

            /** ListInstancesRequest serviceHash. */
            public serviceHash: Uint8Array;
        }

        /** Properties of a ListInstancesResponse. */
        interface IListInstancesResponse {

            /** ListInstancesResponse instances */
            instances?: (types.IInstance[]|null);
        }

        /** Represents a ListInstancesResponse. */
        class ListInstancesResponse implements IListInstancesResponse {

            /**
             * Constructs a new ListInstancesResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IListInstancesResponse);

            /** ListInstancesResponse instances. */
            public instances: types.IInstance[];
        }

        /** Properties of a CreateInstanceRequest. */
        interface ICreateInstanceRequest {

            /** CreateInstanceRequest serviceHash */
            serviceHash?: (Uint8Array|null);

            /** CreateInstanceRequest env */
            env?: (string[]|null);
        }

        /** Represents a CreateInstanceRequest. */
        class CreateInstanceRequest implements ICreateInstanceRequest {

            /**
             * Constructs a new CreateInstanceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateInstanceRequest);

            /** CreateInstanceRequest serviceHash. */
            public serviceHash: Uint8Array;

            /** CreateInstanceRequest env. */
            public env: string[];
        }

        /** Properties of a CreateInstanceResponse. */
        interface ICreateInstanceResponse {

            /** CreateInstanceResponse hash */
            hash?: (Uint8Array|null);
        }

        /** Represents a CreateInstanceResponse. */
        class CreateInstanceResponse implements ICreateInstanceResponse {

            /**
             * Constructs a new CreateInstanceResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ICreateInstanceResponse);

            /** CreateInstanceResponse hash. */
            public hash: Uint8Array;
        }

        /** Properties of a DeleteInstanceRequest. */
        interface IDeleteInstanceRequest {

            /** DeleteInstanceRequest hash */
            hash?: (Uint8Array|null);

            /** DeleteInstanceRequest deleteData */
            deleteData?: (boolean|null);
        }

        /** Represents a DeleteInstanceRequest. */
        class DeleteInstanceRequest implements IDeleteInstanceRequest {

            /**
             * Constructs a new DeleteInstanceRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IDeleteInstanceRequest);

            /** DeleteInstanceRequest hash. */
            public hash: Uint8Array;

            /** DeleteInstanceRequest deleteData. */
            public deleteData: boolean;
        }

        /** Properties of a DeleteInstanceResponse. */
        interface IDeleteInstanceResponse {
        }

        /** Represents a DeleteInstanceResponse. */
        class DeleteInstanceResponse implements IDeleteInstanceResponse {

            /**
             * Constructs a new DeleteInstanceResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IDeleteInstanceResponse);
        }
    }
}

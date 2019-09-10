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

    /** Namespace google. */
    namespace google {

        /** Namespace protobuf. */
        namespace protobuf {

            /** Properties of a FileDescriptorSet. */
            interface IFileDescriptorSet {

                /** FileDescriptorSet file */
                file?: (google.protobuf.IFileDescriptorProto[]|null);
            }

            /** Represents a FileDescriptorSet. */
            class FileDescriptorSet implements IFileDescriptorSet {

                /**
                 * Constructs a new FileDescriptorSet.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IFileDescriptorSet);

                /** FileDescriptorSet file. */
                public file: google.protobuf.IFileDescriptorProto[];
            }

            /** Properties of a FileDescriptorProto. */
            interface IFileDescriptorProto {

                /** FileDescriptorProto name */
                name?: (string|null);

                /** FileDescriptorProto package */
                "package"?: (string|null);

                /** FileDescriptorProto dependency */
                dependency?: (string[]|null);

                /** FileDescriptorProto publicDependency */
                publicDependency?: (number[]|null);

                /** FileDescriptorProto weakDependency */
                weakDependency?: (number[]|null);

                /** FileDescriptorProto messageType */
                messageType?: (google.protobuf.IDescriptorProto[]|null);

                /** FileDescriptorProto enumType */
                enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

                /** FileDescriptorProto service */
                service?: (google.protobuf.IServiceDescriptorProto[]|null);

                /** FileDescriptorProto extension */
                extension?: (google.protobuf.IFieldDescriptorProto[]|null);

                /** FileDescriptorProto options */
                options?: (google.protobuf.IFileOptions|null);

                /** FileDescriptorProto sourceCodeInfo */
                sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

                /** FileDescriptorProto syntax */
                syntax?: (string|null);
            }

            /** Represents a FileDescriptorProto. */
            class FileDescriptorProto implements IFileDescriptorProto {

                /**
                 * Constructs a new FileDescriptorProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IFileDescriptorProto);

                /** FileDescriptorProto name. */
                public name: string;

                /** FileDescriptorProto package. */
                public package: string;

                /** FileDescriptorProto dependency. */
                public dependency: string[];

                /** FileDescriptorProto publicDependency. */
                public publicDependency: number[];

                /** FileDescriptorProto weakDependency. */
                public weakDependency: number[];

                /** FileDescriptorProto messageType. */
                public messageType: google.protobuf.IDescriptorProto[];

                /** FileDescriptorProto enumType. */
                public enumType: google.protobuf.IEnumDescriptorProto[];

                /** FileDescriptorProto service. */
                public service: google.protobuf.IServiceDescriptorProto[];

                /** FileDescriptorProto extension. */
                public extension: google.protobuf.IFieldDescriptorProto[];

                /** FileDescriptorProto options. */
                public options?: (google.protobuf.IFileOptions|null);

                /** FileDescriptorProto sourceCodeInfo. */
                public sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

                /** FileDescriptorProto syntax. */
                public syntax: string;
            }

            /** Properties of a DescriptorProto. */
            interface IDescriptorProto {

                /** DescriptorProto name */
                name?: (string|null);

                /** DescriptorProto field */
                field?: (google.protobuf.IFieldDescriptorProto[]|null);

                /** DescriptorProto extension */
                extension?: (google.protobuf.IFieldDescriptorProto[]|null);

                /** DescriptorProto nestedType */
                nestedType?: (google.protobuf.IDescriptorProto[]|null);

                /** DescriptorProto enumType */
                enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

                /** DescriptorProto extensionRange */
                extensionRange?: (google.protobuf.DescriptorProto.IExtensionRange[]|null);

                /** DescriptorProto oneofDecl */
                oneofDecl?: (google.protobuf.IOneofDescriptorProto[]|null);

                /** DescriptorProto options */
                options?: (google.protobuf.IMessageOptions|null);

                /** DescriptorProto reservedRange */
                reservedRange?: (google.protobuf.DescriptorProto.IReservedRange[]|null);

                /** DescriptorProto reservedName */
                reservedName?: (string[]|null);
            }

            /** Represents a DescriptorProto. */
            class DescriptorProto implements IDescriptorProto {

                /**
                 * Constructs a new DescriptorProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IDescriptorProto);

                /** DescriptorProto name. */
                public name: string;

                /** DescriptorProto field. */
                public field: google.protobuf.IFieldDescriptorProto[];

                /** DescriptorProto extension. */
                public extension: google.protobuf.IFieldDescriptorProto[];

                /** DescriptorProto nestedType. */
                public nestedType: google.protobuf.IDescriptorProto[];

                /** DescriptorProto enumType. */
                public enumType: google.protobuf.IEnumDescriptorProto[];

                /** DescriptorProto extensionRange. */
                public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];

                /** DescriptorProto oneofDecl. */
                public oneofDecl: google.protobuf.IOneofDescriptorProto[];

                /** DescriptorProto options. */
                public options?: (google.protobuf.IMessageOptions|null);

                /** DescriptorProto reservedRange. */
                public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];

                /** DescriptorProto reservedName. */
                public reservedName: string[];
            }

            namespace DescriptorProto {

                /** Properties of an ExtensionRange. */
                interface IExtensionRange {

                    /** ExtensionRange start */
                    start?: (number|null);

                    /** ExtensionRange end */
                    end?: (number|null);
                }

                /** Represents an ExtensionRange. */
                class ExtensionRange implements IExtensionRange {

                    /**
                     * Constructs a new ExtensionRange.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);

                    /** ExtensionRange start. */
                    public start: number;

                    /** ExtensionRange end. */
                    public end: number;
                }

                /** Properties of a ReservedRange. */
                interface IReservedRange {

                    /** ReservedRange start */
                    start?: (number|null);

                    /** ReservedRange end */
                    end?: (number|null);
                }

                /** Represents a ReservedRange. */
                class ReservedRange implements IReservedRange {

                    /**
                     * Constructs a new ReservedRange.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);

                    /** ReservedRange start. */
                    public start: number;

                    /** ReservedRange end. */
                    public end: number;
                }
            }

            /** Properties of a FieldDescriptorProto. */
            interface IFieldDescriptorProto {

                /** FieldDescriptorProto name */
                name?: (string|null);

                /** FieldDescriptorProto number */
                number?: (number|null);

                /** FieldDescriptorProto label */
                label?: (google.protobuf.FieldDescriptorProto.Label|null);

                /** FieldDescriptorProto type */
                type?: (google.protobuf.FieldDescriptorProto.Type|null);

                /** FieldDescriptorProto typeName */
                typeName?: (string|null);

                /** FieldDescriptorProto extendee */
                extendee?: (string|null);

                /** FieldDescriptorProto defaultValue */
                defaultValue?: (string|null);

                /** FieldDescriptorProto oneofIndex */
                oneofIndex?: (number|null);

                /** FieldDescriptorProto jsonName */
                jsonName?: (string|null);

                /** FieldDescriptorProto options */
                options?: (google.protobuf.IFieldOptions|null);
            }

            /** Represents a FieldDescriptorProto. */
            class FieldDescriptorProto implements IFieldDescriptorProto {

                /**
                 * Constructs a new FieldDescriptorProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IFieldDescriptorProto);

                /** FieldDescriptorProto name. */
                public name: string;

                /** FieldDescriptorProto number. */
                public number: number;

                /** FieldDescriptorProto label. */
                public label: google.protobuf.FieldDescriptorProto.Label;

                /** FieldDescriptorProto type. */
                public type: google.protobuf.FieldDescriptorProto.Type;

                /** FieldDescriptorProto typeName. */
                public typeName: string;

                /** FieldDescriptorProto extendee. */
                public extendee: string;

                /** FieldDescriptorProto defaultValue. */
                public defaultValue: string;

                /** FieldDescriptorProto oneofIndex. */
                public oneofIndex: number;

                /** FieldDescriptorProto jsonName. */
                public jsonName: string;

                /** FieldDescriptorProto options. */
                public options?: (google.protobuf.IFieldOptions|null);
            }

            namespace FieldDescriptorProto {

                /** Type enum. */
                enum Type {
                    TYPE_DOUBLE = 1,
                    TYPE_FLOAT = 2,
                    TYPE_INT64 = 3,
                    TYPE_UINT64 = 4,
                    TYPE_INT32 = 5,
                    TYPE_FIXED64 = 6,
                    TYPE_FIXED32 = 7,
                    TYPE_BOOL = 8,
                    TYPE_STRING = 9,
                    TYPE_GROUP = 10,
                    TYPE_MESSAGE = 11,
                    TYPE_BYTES = 12,
                    TYPE_UINT32 = 13,
                    TYPE_ENUM = 14,
                    TYPE_SFIXED32 = 15,
                    TYPE_SFIXED64 = 16,
                    TYPE_SINT32 = 17,
                    TYPE_SINT64 = 18
                }

                /** Label enum. */
                enum Label {
                    LABEL_OPTIONAL = 1,
                    LABEL_REQUIRED = 2,
                    LABEL_REPEATED = 3
                }
            }

            /** Properties of an OneofDescriptorProto. */
            interface IOneofDescriptorProto {

                /** OneofDescriptorProto name */
                name?: (string|null);

                /** OneofDescriptorProto options */
                options?: (google.protobuf.IOneofOptions|null);
            }

            /** Represents an OneofDescriptorProto. */
            class OneofDescriptorProto implements IOneofDescriptorProto {

                /**
                 * Constructs a new OneofDescriptorProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IOneofDescriptorProto);

                /** OneofDescriptorProto name. */
                public name: string;

                /** OneofDescriptorProto options. */
                public options?: (google.protobuf.IOneofOptions|null);
            }

            /** Properties of an EnumDescriptorProto. */
            interface IEnumDescriptorProto {

                /** EnumDescriptorProto name */
                name?: (string|null);

                /** EnumDescriptorProto value */
                value?: (google.protobuf.IEnumValueDescriptorProto[]|null);

                /** EnumDescriptorProto options */
                options?: (google.protobuf.IEnumOptions|null);
            }

            /** Represents an EnumDescriptorProto. */
            class EnumDescriptorProto implements IEnumDescriptorProto {

                /**
                 * Constructs a new EnumDescriptorProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IEnumDescriptorProto);

                /** EnumDescriptorProto name. */
                public name: string;

                /** EnumDescriptorProto value. */
                public value: google.protobuf.IEnumValueDescriptorProto[];

                /** EnumDescriptorProto options. */
                public options?: (google.protobuf.IEnumOptions|null);
            }

            /** Properties of an EnumValueDescriptorProto. */
            interface IEnumValueDescriptorProto {

                /** EnumValueDescriptorProto name */
                name?: (string|null);

                /** EnumValueDescriptorProto number */
                number?: (number|null);

                /** EnumValueDescriptorProto options */
                options?: (google.protobuf.IEnumValueOptions|null);
            }

            /** Represents an EnumValueDescriptorProto. */
            class EnumValueDescriptorProto implements IEnumValueDescriptorProto {

                /**
                 * Constructs a new EnumValueDescriptorProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IEnumValueDescriptorProto);

                /** EnumValueDescriptorProto name. */
                public name: string;

                /** EnumValueDescriptorProto number. */
                public number: number;

                /** EnumValueDescriptorProto options. */
                public options?: (google.protobuf.IEnumValueOptions|null);
            }

            /** Properties of a ServiceDescriptorProto. */
            interface IServiceDescriptorProto {

                /** ServiceDescriptorProto name */
                name?: (string|null);

                /** ServiceDescriptorProto method */
                method?: (google.protobuf.IMethodDescriptorProto[]|null);

                /** ServiceDescriptorProto options */
                options?: (google.protobuf.IServiceOptions|null);
            }

            /** Represents a ServiceDescriptorProto. */
            class ServiceDescriptorProto implements IServiceDescriptorProto {

                /**
                 * Constructs a new ServiceDescriptorProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IServiceDescriptorProto);

                /** ServiceDescriptorProto name. */
                public name: string;

                /** ServiceDescriptorProto method. */
                public method: google.protobuf.IMethodDescriptorProto[];

                /** ServiceDescriptorProto options. */
                public options?: (google.protobuf.IServiceOptions|null);
            }

            /** Properties of a MethodDescriptorProto. */
            interface IMethodDescriptorProto {

                /** MethodDescriptorProto name */
                name?: (string|null);

                /** MethodDescriptorProto inputType */
                inputType?: (string|null);

                /** MethodDescriptorProto outputType */
                outputType?: (string|null);

                /** MethodDescriptorProto options */
                options?: (google.protobuf.IMethodOptions|null);

                /** MethodDescriptorProto clientStreaming */
                clientStreaming?: (boolean|null);

                /** MethodDescriptorProto serverStreaming */
                serverStreaming?: (boolean|null);
            }

            /** Represents a MethodDescriptorProto. */
            class MethodDescriptorProto implements IMethodDescriptorProto {

                /**
                 * Constructs a new MethodDescriptorProto.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IMethodDescriptorProto);

                /** MethodDescriptorProto name. */
                public name: string;

                /** MethodDescriptorProto inputType. */
                public inputType: string;

                /** MethodDescriptorProto outputType. */
                public outputType: string;

                /** MethodDescriptorProto options. */
                public options?: (google.protobuf.IMethodOptions|null);

                /** MethodDescriptorProto clientStreaming. */
                public clientStreaming: boolean;

                /** MethodDescriptorProto serverStreaming. */
                public serverStreaming: boolean;
            }

            /** Properties of a FileOptions. */
            interface IFileOptions {

                /** FileOptions javaPackage */
                javaPackage?: (string|null);

                /** FileOptions javaOuterClassname */
                javaOuterClassname?: (string|null);

                /** FileOptions javaMultipleFiles */
                javaMultipleFiles?: (boolean|null);

                /** FileOptions javaGenerateEqualsAndHash */
                javaGenerateEqualsAndHash?: (boolean|null);

                /** FileOptions javaStringCheckUtf8 */
                javaStringCheckUtf8?: (boolean|null);

                /** FileOptions optimizeFor */
                optimizeFor?: (google.protobuf.FileOptions.OptimizeMode|null);

                /** FileOptions goPackage */
                goPackage?: (string|null);

                /** FileOptions ccGenericServices */
                ccGenericServices?: (boolean|null);

                /** FileOptions javaGenericServices */
                javaGenericServices?: (boolean|null);

                /** FileOptions pyGenericServices */
                pyGenericServices?: (boolean|null);

                /** FileOptions deprecated */
                deprecated?: (boolean|null);

                /** FileOptions ccEnableArenas */
                ccEnableArenas?: (boolean|null);

                /** FileOptions objcClassPrefix */
                objcClassPrefix?: (string|null);

                /** FileOptions csharpNamespace */
                csharpNamespace?: (string|null);

                /** FileOptions uninterpretedOption */
                uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

                /** FileOptions .gogoproto.goprotoGettersAll */
                ".gogoproto.goprotoGettersAll"?: (boolean|null);

                /** FileOptions .gogoproto.goprotoEnumPrefixAll */
                ".gogoproto.goprotoEnumPrefixAll"?: (boolean|null);

                /** FileOptions .gogoproto.goprotoStringerAll */
                ".gogoproto.goprotoStringerAll"?: (boolean|null);

                /** FileOptions .gogoproto.verboseEqualAll */
                ".gogoproto.verboseEqualAll"?: (boolean|null);

                /** FileOptions .gogoproto.faceAll */
                ".gogoproto.faceAll"?: (boolean|null);

                /** FileOptions .gogoproto.gostringAll */
                ".gogoproto.gostringAll"?: (boolean|null);

                /** FileOptions .gogoproto.populateAll */
                ".gogoproto.populateAll"?: (boolean|null);

                /** FileOptions .gogoproto.stringerAll */
                ".gogoproto.stringerAll"?: (boolean|null);

                /** FileOptions .gogoproto.onlyoneAll */
                ".gogoproto.onlyoneAll"?: (boolean|null);

                /** FileOptions .gogoproto.equalAll */
                ".gogoproto.equalAll"?: (boolean|null);

                /** FileOptions .gogoproto.descriptionAll */
                ".gogoproto.descriptionAll"?: (boolean|null);

                /** FileOptions .gogoproto.testgenAll */
                ".gogoproto.testgenAll"?: (boolean|null);

                /** FileOptions .gogoproto.benchgenAll */
                ".gogoproto.benchgenAll"?: (boolean|null);

                /** FileOptions .gogoproto.marshalerAll */
                ".gogoproto.marshalerAll"?: (boolean|null);

                /** FileOptions .gogoproto.unmarshalerAll */
                ".gogoproto.unmarshalerAll"?: (boolean|null);

                /** FileOptions .gogoproto.stableMarshalerAll */
                ".gogoproto.stableMarshalerAll"?: (boolean|null);

                /** FileOptions .gogoproto.sizerAll */
                ".gogoproto.sizerAll"?: (boolean|null);

                /** FileOptions .gogoproto.goprotoEnumStringerAll */
                ".gogoproto.goprotoEnumStringerAll"?: (boolean|null);

                /** FileOptions .gogoproto.enumStringerAll */
                ".gogoproto.enumStringerAll"?: (boolean|null);

                /** FileOptions .gogoproto.unsafeMarshalerAll */
                ".gogoproto.unsafeMarshalerAll"?: (boolean|null);

                /** FileOptions .gogoproto.unsafeUnmarshalerAll */
                ".gogoproto.unsafeUnmarshalerAll"?: (boolean|null);

                /** FileOptions .gogoproto.goprotoExtensionsMapAll */
                ".gogoproto.goprotoExtensionsMapAll"?: (boolean|null);

                /** FileOptions .gogoproto.goprotoUnrecognizedAll */
                ".gogoproto.goprotoUnrecognizedAll"?: (boolean|null);

                /** FileOptions .gogoproto.gogoprotoImport */
                ".gogoproto.gogoprotoImport"?: (boolean|null);

                /** FileOptions .gogoproto.protosizerAll */
                ".gogoproto.protosizerAll"?: (boolean|null);

                /** FileOptions .gogoproto.compareAll */
                ".gogoproto.compareAll"?: (boolean|null);

                /** FileOptions .gogoproto.typedeclAll */
                ".gogoproto.typedeclAll"?: (boolean|null);

                /** FileOptions .gogoproto.enumdeclAll */
                ".gogoproto.enumdeclAll"?: (boolean|null);

                /** FileOptions .gogoproto.goprotoRegistration */
                ".gogoproto.goprotoRegistration"?: (boolean|null);

                /** FileOptions .gogoproto.messagenameAll */
                ".gogoproto.messagenameAll"?: (boolean|null);

                /** FileOptions .gogoproto.goprotoSizecacheAll */
                ".gogoproto.goprotoSizecacheAll"?: (boolean|null);

                /** FileOptions .gogoproto.goprotoUnkeyedAll */
                ".gogoproto.goprotoUnkeyedAll"?: (boolean|null);
            }

            /** Represents a FileOptions. */
            class FileOptions implements IFileOptions {

                /**
                 * Constructs a new FileOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IFileOptions);

                /** FileOptions javaPackage. */
                public javaPackage: string;

                /** FileOptions javaOuterClassname. */
                public javaOuterClassname: string;

                /** FileOptions javaMultipleFiles. */
                public javaMultipleFiles: boolean;

                /** FileOptions javaGenerateEqualsAndHash. */
                public javaGenerateEqualsAndHash: boolean;

                /** FileOptions javaStringCheckUtf8. */
                public javaStringCheckUtf8: boolean;

                /** FileOptions optimizeFor. */
                public optimizeFor: google.protobuf.FileOptions.OptimizeMode;

                /** FileOptions goPackage. */
                public goPackage: string;

                /** FileOptions ccGenericServices. */
                public ccGenericServices: boolean;

                /** FileOptions javaGenericServices. */
                public javaGenericServices: boolean;

                /** FileOptions pyGenericServices. */
                public pyGenericServices: boolean;

                /** FileOptions deprecated. */
                public deprecated: boolean;

                /** FileOptions ccEnableArenas. */
                public ccEnableArenas: boolean;

                /** FileOptions objcClassPrefix. */
                public objcClassPrefix: string;

                /** FileOptions csharpNamespace. */
                public csharpNamespace: string;

                /** FileOptions uninterpretedOption. */
                public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            }

            namespace FileOptions {

                /** OptimizeMode enum. */
                enum OptimizeMode {
                    SPEED = 1,
                    CODE_SIZE = 2,
                    LITE_RUNTIME = 3
                }
            }

            /** Properties of a MessageOptions. */
            interface IMessageOptions {

                /** MessageOptions messageSetWireFormat */
                messageSetWireFormat?: (boolean|null);

                /** MessageOptions noStandardDescriptorAccessor */
                noStandardDescriptorAccessor?: (boolean|null);

                /** MessageOptions deprecated */
                deprecated?: (boolean|null);

                /** MessageOptions mapEntry */
                mapEntry?: (boolean|null);

                /** MessageOptions uninterpretedOption */
                uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

                /** MessageOptions .gogoproto.goprotoGetters */
                ".gogoproto.goprotoGetters"?: (boolean|null);

                /** MessageOptions .gogoproto.goprotoStringer */
                ".gogoproto.goprotoStringer"?: (boolean|null);

                /** MessageOptions .gogoproto.verboseEqual */
                ".gogoproto.verboseEqual"?: (boolean|null);

                /** MessageOptions .gogoproto.face */
                ".gogoproto.face"?: (boolean|null);

                /** MessageOptions .gogoproto.gostring */
                ".gogoproto.gostring"?: (boolean|null);

                /** MessageOptions .gogoproto.populate */
                ".gogoproto.populate"?: (boolean|null);

                /** MessageOptions .gogoproto.stringer */
                ".gogoproto.stringer"?: (boolean|null);

                /** MessageOptions .gogoproto.onlyone */
                ".gogoproto.onlyone"?: (boolean|null);

                /** MessageOptions .gogoproto.equal */
                ".gogoproto.equal"?: (boolean|null);

                /** MessageOptions .gogoproto.description */
                ".gogoproto.description"?: (boolean|null);

                /** MessageOptions .gogoproto.testgen */
                ".gogoproto.testgen"?: (boolean|null);

                /** MessageOptions .gogoproto.benchgen */
                ".gogoproto.benchgen"?: (boolean|null);

                /** MessageOptions .gogoproto.marshaler */
                ".gogoproto.marshaler"?: (boolean|null);

                /** MessageOptions .gogoproto.unmarshaler */
                ".gogoproto.unmarshaler"?: (boolean|null);

                /** MessageOptions .gogoproto.stableMarshaler */
                ".gogoproto.stableMarshaler"?: (boolean|null);

                /** MessageOptions .gogoproto.sizer */
                ".gogoproto.sizer"?: (boolean|null);

                /** MessageOptions .gogoproto.unsafeMarshaler */
                ".gogoproto.unsafeMarshaler"?: (boolean|null);

                /** MessageOptions .gogoproto.unsafeUnmarshaler */
                ".gogoproto.unsafeUnmarshaler"?: (boolean|null);

                /** MessageOptions .gogoproto.goprotoExtensionsMap */
                ".gogoproto.goprotoExtensionsMap"?: (boolean|null);

                /** MessageOptions .gogoproto.goprotoUnrecognized */
                ".gogoproto.goprotoUnrecognized"?: (boolean|null);

                /** MessageOptions .gogoproto.protosizer */
                ".gogoproto.protosizer"?: (boolean|null);

                /** MessageOptions .gogoproto.compare */
                ".gogoproto.compare"?: (boolean|null);

                /** MessageOptions .gogoproto.typedecl */
                ".gogoproto.typedecl"?: (boolean|null);

                /** MessageOptions .gogoproto.messagename */
                ".gogoproto.messagename"?: (boolean|null);

                /** MessageOptions .gogoproto.goprotoSizecache */
                ".gogoproto.goprotoSizecache"?: (boolean|null);

                /** MessageOptions .gogoproto.goprotoUnkeyed */
                ".gogoproto.goprotoUnkeyed"?: (boolean|null);
            }

            /** Represents a MessageOptions. */
            class MessageOptions implements IMessageOptions {

                /**
                 * Constructs a new MessageOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IMessageOptions);

                /** MessageOptions messageSetWireFormat. */
                public messageSetWireFormat: boolean;

                /** MessageOptions noStandardDescriptorAccessor. */
                public noStandardDescriptorAccessor: boolean;

                /** MessageOptions deprecated. */
                public deprecated: boolean;

                /** MessageOptions mapEntry. */
                public mapEntry: boolean;

                /** MessageOptions uninterpretedOption. */
                public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            }

            /** Properties of a FieldOptions. */
            interface IFieldOptions {

                /** FieldOptions ctype */
                ctype?: (google.protobuf.FieldOptions.CType|null);

                /** FieldOptions packed */
                packed?: (boolean|null);

                /** FieldOptions jstype */
                jstype?: (google.protobuf.FieldOptions.JSType|null);

                /** FieldOptions lazy */
                lazy?: (boolean|null);

                /** FieldOptions deprecated */
                deprecated?: (boolean|null);

                /** FieldOptions weak */
                weak?: (boolean|null);

                /** FieldOptions uninterpretedOption */
                uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

                /** FieldOptions .gogoproto.nullable */
                ".gogoproto.nullable"?: (boolean|null);

                /** FieldOptions .gogoproto.embed */
                ".gogoproto.embed"?: (boolean|null);

                /** FieldOptions .gogoproto.customtype */
                ".gogoproto.customtype"?: (string|null);

                /** FieldOptions .gogoproto.customname */
                ".gogoproto.customname"?: (string|null);

                /** FieldOptions .gogoproto.jsontag */
                ".gogoproto.jsontag"?: (string|null);

                /** FieldOptions .gogoproto.moretags */
                ".gogoproto.moretags"?: (string|null);

                /** FieldOptions .gogoproto.casttype */
                ".gogoproto.casttype"?: (string|null);

                /** FieldOptions .gogoproto.castkey */
                ".gogoproto.castkey"?: (string|null);

                /** FieldOptions .gogoproto.castvalue */
                ".gogoproto.castvalue"?: (string|null);

                /** FieldOptions .gogoproto.stdtime */
                ".gogoproto.stdtime"?: (boolean|null);

                /** FieldOptions .gogoproto.stdduration */
                ".gogoproto.stdduration"?: (boolean|null);

                /** FieldOptions .gogoproto.wktpointer */
                ".gogoproto.wktpointer"?: (boolean|null);
            }

            /** Represents a FieldOptions. */
            class FieldOptions implements IFieldOptions {

                /**
                 * Constructs a new FieldOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IFieldOptions);

                /** FieldOptions ctype. */
                public ctype: google.protobuf.FieldOptions.CType;

                /** FieldOptions packed. */
                public packed: boolean;

                /** FieldOptions jstype. */
                public jstype: google.protobuf.FieldOptions.JSType;

                /** FieldOptions lazy. */
                public lazy: boolean;

                /** FieldOptions deprecated. */
                public deprecated: boolean;

                /** FieldOptions weak. */
                public weak: boolean;

                /** FieldOptions uninterpretedOption. */
                public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            }

            namespace FieldOptions {

                /** CType enum. */
                enum CType {
                    STRING = 0,
                    CORD = 1,
                    STRING_PIECE = 2
                }

                /** JSType enum. */
                enum JSType {
                    JS_NORMAL = 0,
                    JS_STRING = 1,
                    JS_NUMBER = 2
                }
            }

            /** Properties of an OneofOptions. */
            interface IOneofOptions {

                /** OneofOptions uninterpretedOption */
                uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
            }

            /** Represents an OneofOptions. */
            class OneofOptions implements IOneofOptions {

                /**
                 * Constructs a new OneofOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IOneofOptions);

                /** OneofOptions uninterpretedOption. */
                public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            }

            /** Properties of an EnumOptions. */
            interface IEnumOptions {

                /** EnumOptions allowAlias */
                allowAlias?: (boolean|null);

                /** EnumOptions deprecated */
                deprecated?: (boolean|null);

                /** EnumOptions uninterpretedOption */
                uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

                /** EnumOptions .gogoproto.goprotoEnumPrefix */
                ".gogoproto.goprotoEnumPrefix"?: (boolean|null);

                /** EnumOptions .gogoproto.goprotoEnumStringer */
                ".gogoproto.goprotoEnumStringer"?: (boolean|null);

                /** EnumOptions .gogoproto.enumStringer */
                ".gogoproto.enumStringer"?: (boolean|null);

                /** EnumOptions .gogoproto.enumCustomname */
                ".gogoproto.enumCustomname"?: (string|null);

                /** EnumOptions .gogoproto.enumdecl */
                ".gogoproto.enumdecl"?: (boolean|null);
            }

            /** Represents an EnumOptions. */
            class EnumOptions implements IEnumOptions {

                /**
                 * Constructs a new EnumOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IEnumOptions);

                /** EnumOptions allowAlias. */
                public allowAlias: boolean;

                /** EnumOptions deprecated. */
                public deprecated: boolean;

                /** EnumOptions uninterpretedOption. */
                public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            }

            /** Properties of an EnumValueOptions. */
            interface IEnumValueOptions {

                /** EnumValueOptions deprecated */
                deprecated?: (boolean|null);

                /** EnumValueOptions uninterpretedOption */
                uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

                /** EnumValueOptions .gogoproto.enumvalueCustomname */
                ".gogoproto.enumvalueCustomname"?: (string|null);
            }

            /** Represents an EnumValueOptions. */
            class EnumValueOptions implements IEnumValueOptions {

                /**
                 * Constructs a new EnumValueOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IEnumValueOptions);

                /** EnumValueOptions deprecated. */
                public deprecated: boolean;

                /** EnumValueOptions uninterpretedOption. */
                public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            }

            /** Properties of a ServiceOptions. */
            interface IServiceOptions {

                /** ServiceOptions deprecated */
                deprecated?: (boolean|null);

                /** ServiceOptions uninterpretedOption */
                uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
            }

            /** Represents a ServiceOptions. */
            class ServiceOptions implements IServiceOptions {

                /**
                 * Constructs a new ServiceOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IServiceOptions);

                /** ServiceOptions deprecated. */
                public deprecated: boolean;

                /** ServiceOptions uninterpretedOption. */
                public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            }

            /** Properties of a MethodOptions. */
            interface IMethodOptions {

                /** MethodOptions deprecated */
                deprecated?: (boolean|null);

                /** MethodOptions uninterpretedOption */
                uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
            }

            /** Represents a MethodOptions. */
            class MethodOptions implements IMethodOptions {

                /**
                 * Constructs a new MethodOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IMethodOptions);

                /** MethodOptions deprecated. */
                public deprecated: boolean;

                /** MethodOptions uninterpretedOption. */
                public uninterpretedOption: google.protobuf.IUninterpretedOption[];
            }

            /** Properties of an UninterpretedOption. */
            interface IUninterpretedOption {

                /** UninterpretedOption name */
                name?: (google.protobuf.UninterpretedOption.INamePart[]|null);

                /** UninterpretedOption identifierValue */
                identifierValue?: (string|null);

                /** UninterpretedOption positiveIntValue */
                positiveIntValue?: (number|Long|null);

                /** UninterpretedOption negativeIntValue */
                negativeIntValue?: (number|Long|null);

                /** UninterpretedOption doubleValue */
                doubleValue?: (number|null);

                /** UninterpretedOption stringValue */
                stringValue?: (Uint8Array|null);

                /** UninterpretedOption aggregateValue */
                aggregateValue?: (string|null);
            }

            /** Represents an UninterpretedOption. */
            class UninterpretedOption implements IUninterpretedOption {

                /**
                 * Constructs a new UninterpretedOption.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IUninterpretedOption);

                /** UninterpretedOption name. */
                public name: google.protobuf.UninterpretedOption.INamePart[];

                /** UninterpretedOption identifierValue. */
                public identifierValue: string;

                /** UninterpretedOption positiveIntValue. */
                public positiveIntValue: (number|Long);

                /** UninterpretedOption negativeIntValue. */
                public negativeIntValue: (number|Long);

                /** UninterpretedOption doubleValue. */
                public doubleValue: number;

                /** UninterpretedOption stringValue. */
                public stringValue: Uint8Array;

                /** UninterpretedOption aggregateValue. */
                public aggregateValue: string;
            }

            namespace UninterpretedOption {

                /** Properties of a NamePart. */
                interface INamePart {

                    /** NamePart namePart */
                    namePart: string;

                    /** NamePart isExtension */
                    isExtension: boolean;
                }

                /** Represents a NamePart. */
                class NamePart implements INamePart {

                    /**
                     * Constructs a new NamePart.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.protobuf.UninterpretedOption.INamePart);

                    /** NamePart namePart. */
                    public namePart: string;

                    /** NamePart isExtension. */
                    public isExtension: boolean;
                }
            }

            /** Properties of a SourceCodeInfo. */
            interface ISourceCodeInfo {

                /** SourceCodeInfo location */
                location?: (google.protobuf.SourceCodeInfo.ILocation[]|null);
            }

            /** Represents a SourceCodeInfo. */
            class SourceCodeInfo implements ISourceCodeInfo {

                /**
                 * Constructs a new SourceCodeInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.ISourceCodeInfo);

                /** SourceCodeInfo location. */
                public location: google.protobuf.SourceCodeInfo.ILocation[];
            }

            namespace SourceCodeInfo {

                /** Properties of a Location. */
                interface ILocation {

                    /** Location path */
                    path?: (number[]|null);

                    /** Location span */
                    span?: (number[]|null);

                    /** Location leadingComments */
                    leadingComments?: (string|null);

                    /** Location trailingComments */
                    trailingComments?: (string|null);

                    /** Location leadingDetachedComments */
                    leadingDetachedComments?: (string[]|null);
                }

                /** Represents a Location. */
                class Location implements ILocation {

                    /**
                     * Constructs a new Location.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);

                    /** Location path. */
                    public path: number[];

                    /** Location span. */
                    public span: number[];

                    /** Location leadingComments. */
                    public leadingComments: string;

                    /** Location trailingComments. */
                    public trailingComments: string;

                    /** Location leadingDetachedComments. */
                    public leadingDetachedComments: string[];
                }
            }

            /** Properties of a GeneratedCodeInfo. */
            interface IGeneratedCodeInfo {

                /** GeneratedCodeInfo annotation */
                annotation?: (google.protobuf.GeneratedCodeInfo.IAnnotation[]|null);
            }

            /** Represents a GeneratedCodeInfo. */
            class GeneratedCodeInfo implements IGeneratedCodeInfo {

                /**
                 * Constructs a new GeneratedCodeInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.IGeneratedCodeInfo);

                /** GeneratedCodeInfo annotation. */
                public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];
            }

            namespace GeneratedCodeInfo {

                /** Properties of an Annotation. */
                interface IAnnotation {

                    /** Annotation path */
                    path?: (number[]|null);

                    /** Annotation sourceFile */
                    sourceFile?: (string|null);

                    /** Annotation begin */
                    begin?: (number|null);

                    /** Annotation end */
                    end?: (number|null);
                }

                /** Represents an Annotation. */
                class Annotation implements IAnnotation {

                    /**
                     * Constructs a new Annotation.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);

                    /** Annotation path. */
                    public path: number[];

                    /** Annotation sourceFile. */
                    public sourceFile: string;

                    /** Annotation begin. */
                    public begin: number;

                    /** Annotation end. */
                    public end: number;
                }
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

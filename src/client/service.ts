interface Service {
    name: string
    description: string
    visibility: string
    publish: string
    tasks: { [key: string]: Task }
    events: { [key: string]: Event }
    dependencies: { [key: string]: Dependency }
    configuration: Dependency
}

interface Task {
    name: string
    description: string
    verifiable: boolean
    payable: boolean
    fees: Fee
    inputs: { [key: string]: Parameter }
    outputs: { [key: string]: Output }
}

interface Fee {
    developer: string
    validator: string
    executor: string
    emittors: string
}

interface Event {
    name: string
    description: string
    data: { [key: string]: Parameter }
}

interface Output {
    name: string
    description: string
    data: { [key: string]: Parameter }
}

interface Parameter {
    name: string
    description: string
    type: string
    optional: boolean
}

interface Dependency {
    image: string
    volumes: string[]
    volumesfrom: string[]
    ports: string[]
    command: string
}

export {
    Service,
    Task,
    Fee,
    Event,
    Output,
    Parameter,
    Dependency
}
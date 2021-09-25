export { default as ExecuteOptions } from "./ExecuteOptions";
export { default as Execution } from "./Execution";

export type ValidatorType =
    | "ss-validator/v1"
    | "node-validator/v1"
    | "fs-validator/v1";

export interface SSValidatorOptions {
    input?: string;
    expectedOutput?: string;
    expectedError?: string;
}

export interface NodeValidatorOptions {
    nodeVersion?: string;
    npmVersion?: string;
    yarnVersion?: string;
}

export interface FSValidatorOptions {
    exists: string[];
}

export interface Test {
    description: string;
    validator: ValidatorType;
    options: SSValidatorOptions | NodeValidatorOptions | FSValidatorOptions;
}

export interface Excercise {
    id: string;
    handle: string;
    statement: string;
    tests: Test[];
}

export interface Configuration {
    exerciseFile: string;
    stdError?: boolean;
    stdOutput?: boolean;
}

export type ValidatorFunction = (
    options: SSValidatorOptions | NodeValidatorOptions | FSValidatorOptions,
    configuration: Configuration
) => Promise<boolean>;

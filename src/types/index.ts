import Execution from "./Execution";

export { default as ExecuteOptions } from "./ExecuteOptions";
export { default as Execution } from "./Execution";

export type AssertFunction<T> = (
    options: T,
    description?: string
) => Promise<AssertionResult<T>>;

export interface AssertOutputOptions {
    command: string;
    input?: string;
    expectedOutput?: string;
    expectedError?: string;
}

export interface AssertToolVersionOptions {
    tool: string;
    version: string;
}

export interface AssertFileOptions {
    path: string;
    regular?: boolean;
}

export interface AssertDirectoryOptions {
    path: string;
}

export interface TestContext {
    assertOutput: AssertFunction<AssertOutputOptions>;

    assertToolVersion: AssertFunction<AssertToolVersionOptions>;

    assertFile: AssertFunction<AssertFileOptions>;

    assertDirectory: AssertFunction<AssertDirectoryOptions>;
}

export interface AssertionResult<T> {
    type: "assert-output" | "assert-version" | string;
    success: boolean;
    description: string;
    time: bigint;
    options: T;
}

export interface OutputAssertionResult
    extends AssertionResult<AssertOutputOptions> {
    execution: Execution;
}

export interface FileAssertionResult
    extends AssertionResult<AssertFileOptions> {}

export interface ToolVersionAssertionResult
    extends AssertionResult<AssertToolVersionOptions> {}

export interface Excercise {
    handle: string;
    statement: string;
    test: (context: TestContext) => Promise<AssertionResult<any>>[];
}

export interface Configuration {
    exerciseFile: string;
    stdError?: boolean;
    stdOutput?: boolean;
}

export default interface Execution {
    standardOutput: string;
    standardError: string;
    exitCode: number | null;
}

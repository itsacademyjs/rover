export default interface ExecuteOptions {
    standardOutputLimit?: number;
    standardOutputEncoding?: string;
    standardErrorLimit?: number;
    standardErrorEncoding?: string;
    standardInput?: string;
    timeout?: number;
}

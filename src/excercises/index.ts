import nodeFiles from "./node";

declare global {
    const suite: (title: string, handle: string, description: string) => void;
    const test: (
        title: string,
        description: string,
        callback: () => void | Promise<void>
    ) => void;
    const beforeEach: (callback: () => void | Promise<void>) => void;
    const afterEach: (callback: () => void | Promise<void>) => void;
}

export default [...nodeFiles];

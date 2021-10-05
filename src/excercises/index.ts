/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import nodeFiles from "./node";

interface SuiteOptions {
    title: string;
    handle: string;
    description: string;
    tags: string[];
}

declare global {
    const suite: (options: SuiteOptions) => void;
    const test: (
        title: string,
        description: string,
        callback: () => void | Promise<void>
    ) => void;
    const beforeEach: (callback: () => void | Promise<void>) => void;
    const afterEach: (callback: () => void | Promise<void>) => void;
}

export default [...nodeFiles];

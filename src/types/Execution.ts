/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default interface Execution {
    standardOutput: string;
    standardError: string;
    exitCode: number | null;
}

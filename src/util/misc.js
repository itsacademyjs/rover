/**
 * Copyright (c) AcademyJS and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const escapeRegex = (string) => string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

module.exports = {
    escapeRegex,
};

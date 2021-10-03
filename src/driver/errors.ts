const { format } = require("util");

/**
 * Contains error codes, factory functions to create throwable error objects,
 * and warning/deprecation functions.
 * @module
 */

/**
 * process.emitWarning or a polyfill
 * @see https://nodejs.org/api/process.html#process_process_emitwarning_warning_options
 * @ignore
 */
const emitWarning = (msg, type?) => {
    if (process.emitWarning) {
        process.emitWarning(msg, type);
    } else {
        /* istanbul ignore next */
        process.nextTick(function () {
            console.warn(type + ": " + msg);
        });
    }
};

/**
 * Show a deprecation warning. Each distinct message is only displayed once.
 * Ignores empty messages.
 *
 * @param {string} [msg] - Warning to print
 */
const deprecate = (msg) => {
    msg = String(msg);
    if (msg && !deprecate.cache[msg]) {
        deprecate.cache[msg] = true;
        emitWarning(msg, "DeprecationWarning");
    }
};
deprecate.cache = {};

/**
 * Show a generic warning.
 * Ignores empty messages.
 *
 * @param {string} [msg] - Warning to print
 */
const warn = (msg) => {
    if (msg) {
        emitWarning(msg);
    }
};

/**
 * When Mocha throws exceptions (or rejects `Promise`s), it attempts to assign a `code` property to the `Error` object, for easier handling. These are the potential values of `code`.
 * @public
 * @namespace
 * @memberof module:lib/errors
 */
const constants = {
    /**
     * An unrecoverable error.
     * @constant
     * @default
     */
    FATAL: "ERR_MOCHA_FATAL",

    /**
     * The type of an argument to a function call is invalid
     * @constant
     * @default
     */
    INVALID_ARG_TYPE: "ERR_MOCHA_INVALID_ARG_TYPE",

    /**
     * The value of an argument to a function call is invalid
     * @constant
     * @default
     */
    INVALID_ARG_VALUE: "ERR_MOCHA_INVALID_ARG_VALUE",

    /**
     * Something was thrown, but it wasn't an `Error`
     * @constant
     * @default
     */
    INVALID_EXCEPTION: "ERR_MOCHA_INVALID_EXCEPTION",

    /**
     * An interface (e.g., `Mocha.interfaces`) is unknown or invalid
     * @constant
     * @default
     */
    INVALID_INTERFACE: "ERR_MOCHA_INVALID_INTERFACE",

    /**
     * A reporter (.e.g, `Mocha.reporters`) is unknown or invalid
     * @constant
     * @default
     */
    INVALID_REPORTER: "ERR_MOCHA_INVALID_REPORTER",

    /**
     * `done()` was called twice in a `Test` or `Hook` callback
     * @constant
     * @default
     */
    MULTIPLE_DONE: "ERR_MOCHA_MULTIPLE_DONE",

    /**
     * No files matched the pattern provided by the user
     * @constant
     * @default
     */
    NO_FILES_MATCH_PATTERN: "ERR_MOCHA_NO_FILES_MATCH_PATTERN",

    /**
     * Known, but unsupported behavior of some kind
     * @constant
     * @default
     */
    UNSUPPORTED: "ERR_MOCHA_UNSUPPORTED",

    /**
     * Invalid state transition occurring in `Mocha` instance
     * @constant
     * @default
     */
    INSTANCE_ALREADY_RUNNING: "ERR_MOCHA_INSTANCE_ALREADY_RUNNING",

    /**
     * Invalid state transition occurring in `Mocha` instance
     * @constant
     * @default
     */
    INSTANCE_ALREADY_DISPOSED: "ERR_MOCHA_INSTANCE_ALREADY_DISPOSED",

    /**
     * Use of `only()` w/ `--forbid-only` results in this error.
     * @constant
     * @default
     */
    FORBIDDEN_EXCLUSIVITY: "ERR_MOCHA_FORBIDDEN_EXCLUSIVITY",

    /**
     * To be thrown when a user-defined plugin implementation (e.g., `mochaHooks`) is invalid
     * @constant
     * @default
     */
    INVALID_PLUGIN_IMPLEMENTATION: "ERR_MOCHA_INVALID_PLUGIN_IMPLEMENTATION",

    /**
     * To be thrown when a builtin or third-party plugin definition (the _definition_ of `mochaHooks`) is invalid
     * @constant
     * @default
     */
    INVALID_PLUGIN_DEFINITION: "ERR_MOCHA_INVALID_PLUGIN_DEFINITION",

    /**
     * When a runnable exceeds its allowed run time.
     * @constant
     * @default
     */
    TIMEOUT: "ERR_MOCHA_TIMEOUT",

    /**
     * Input file is not able to be parsed
     * @constant
     * @default
     */
    UNPARSABLE_FILE: "ERR_MOCHA_UNPARSABLE_FILE",
};

/**
 * A set containing all string values of all Mocha error constants, for use by {@link isMochaError}.
 * @private
 */
const MOCHA_ERRORS = new Set(Object.values(constants));

class MochaError extends Error {
    code: string;
    pattern: string;

    constructor(message: string) {
        super(message);
    }
}

class MochaTypeError extends TypeError {
    constructor(message: string) {
        super(message);
    }

    code: string;
    reporter: any;
}

/**
 * Creates an error object to be thrown when no files to be tested could be found using specified pattern.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} pattern - User-specified argument value.
 * @returns {Error} instance detailing the error condition
 */
function createNoFilesMatchPatternError(message, pattern) {
    const error = new MochaError(message);
    error.code = constants.NO_FILES_MATCH_PATTERN;
    error.pattern = pattern;
    return error;
}

/**
 * Creates an error object to be thrown when the reporter specified in the options was not found.
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @param {string} reporter - User-specified reporter value.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidReporterError(message, reporter) {
    const error = new MochaTypeError(message);
    error.code = constants.INVALID_REPORTER;
    error.reporter = reporter;
    return error;
}

class InvalidInterfaceError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
    interface: any;
}

/**
 * Creates an error object to be thrown when the interface specified in the options was not found.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} ui - User-specified interface value.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidInterfaceError(message, ui) {
    const error = new InvalidInterfaceError(message);
    error.code = constants.INVALID_INTERFACE;
    error.interface = ui;
    return error;
}

class UnsupportedError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
}

/**
 * Creates an error object to be thrown when a behavior, option, or parameter is unsupported.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @returns {Error} instance detailing the error condition
 */
function createUnsupportedError(message) {
    const error = new UnsupportedError(message);
    error.code = constants.UNSUPPORTED;
    return error;
}

/**
 * Creates an error object to be thrown when an argument is missing.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} expected - Expected argument datatype.
 * @returns {Error} instance detailing the error condition
 */
function createMissingArgumentError(message, argument, expected) {
    return createInvalidArgumentTypeError(message, argument, expected);
}

class InvalidArgTypeError extends TypeError {
    constructor(message: string) {
        super(message);
    }

    code: string;
    argument: any;
    expected: any;
    actual: any;
}

/**
 * Creates an error object to be thrown when an argument did not use the supported type
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} expected - Expected argument datatype.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidArgumentTypeError(message, argument, expected) {
    const error = new InvalidArgTypeError(message);
    error.code = constants.INVALID_ARG_TYPE;
    error.argument = argument;
    error.expected = expected;
    error.actual = typeof argument;
    return error;
}

class InvalidArgValueError extends TypeError {
    constructor(message: string) {
        super(message);
    }

    code: string;
    argument: any;
    value: any;
    reason: any;
}

/**
 * Creates an error object to be thrown when an argument did not use the supported value
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} value - Argument value.
 * @param {string} [reason] - Why value is invalid.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidArgumentValueError(message, argument, value, reason) {
    const error = new InvalidArgValueError(message);
    error.code = constants.INVALID_ARG_VALUE;
    error.argument = argument;
    error.value = value;
    error.reason = typeof reason !== "undefined" ? reason : "is invalid";
    return error;
}

class InvalidExceptionError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
    valueType: any;
    value: any;
}

/**
 * Creates an error object to be thrown when an exception was caught, but the `Error` is falsy or undefined.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidExceptionError(message, value) {
    const error = new InvalidExceptionError(message);
    error.code = constants.INVALID_EXCEPTION;
    error.valueType = typeof value;
    error.value = value;
    return error;
}

class FatalError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
    valueType: any;
    value: any;
}

/**
 * Creates an error object to be thrown when an unrecoverable error occurs.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @returns {Error} instance detailing the error condition
 */
function createFatalError(message, value) {
    const error = new FatalError(message);
    error.code = constants.FATAL;
    error.valueType = typeof value;
    error.value = value;
    return error;
}

/**
 * Dynamically creates a plugin-type-specific error based on plugin type
 * @param {string} message - Error message
 * @param {"reporter"|"ui"} pluginType - Plugin type. Future: expand as needed
 * @param {string} [pluginId] - Name/path of plugin, if any
 * @throws When `pluginType` is not known
 * @public
 * @static
 * @returns {Error}
 */
function createInvalidLegacyPluginError(message, pluginType, pluginId) {
    switch (pluginType) {
        case "reporter":
            return createInvalidReporterError(message, pluginId);
        case "ui":
            return createInvalidInterfaceError(message, pluginId);
        default:
            throw new Error('unknown pluginType "' + pluginType + '"');
    }
}

class InstanceAlreadyDisposedError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
    cleanReferencesAfterRun: any;
    instance: any;
}

/**
 * Creates an error object to be thrown when a mocha object's `run` method is executed while it is already disposed.
 * @param {string} message The error message to be displayed.
 * @param {boolean} cleanReferencesAfterRun the value of `cleanReferencesAfterRun`
 * @param {Mocha} instance the mocha instance that throw this error
 * @static
 */
function createMochaInstanceAlreadyDisposedError(
    message,
    cleanReferencesAfterRun,
    instance
) {
    const error = new InstanceAlreadyDisposedError(message);
    error.code = constants.INSTANCE_ALREADY_DISPOSED;
    error.cleanReferencesAfterRun = cleanReferencesAfterRun;
    error.instance = instance;
    return error;
}

class InstanceAlreadyRunningError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
    instance: any;
}

/**
 * Creates an error object to be thrown when a mocha object's `run` method is called while a test run is in progress.
 * @param {string} message The error message to be displayed.
 * @static
 * @public
 */
function createMochaInstanceAlreadyRunningError(message, instance?) {
    const error = new InstanceAlreadyRunningError(message);
    error.code = constants.INSTANCE_ALREADY_RUNNING;
    error.instance = instance;
    return error;
}

class MultipleDoneError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
    valueType: any;
    value: any;
}

/**
 * Creates an error object to be thrown when done() is called multiple times in a test
 *
 * @public
 * @param {Runnable} runnable - Original runnable
 * @param {Error} [originalErr] - Original error, if any
 * @returns {Error} instance detailing the error condition
 * @static
 */
function createMultipleDoneError(runnable, originalErr) {
    var title;
    try {
        title = format("<%s>", runnable.fullTitle());
        if (runnable.parent.root) {
            title += " (of root suite)";
        }
    } catch (ignored) {
        title = format("<%s> (of unknown suite)", runnable.title);
    }
    var message = format(
        "done() called multiple times in %s %s",
        runnable.type ? runnable.type : "unknown runnable",
        title
    );
    if (runnable.file) {
        message += format(" of file %s", runnable.file);
    }
    if (originalErr) {
        message += format(
            "; in addition, done() received error: %s",
            originalErr
        );
    }

    const error = new MultipleDoneError(message);
    error.code = constants.MULTIPLE_DONE;
    error.valueType = typeof originalErr;
    error.value = originalErr;
    return error;
}

class ForbiddenExclusivityError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
}

/**
 * Creates an error object to be thrown when `.only()` is used with
 * `--forbid-only`.
 * @static
 * @public
 * @param {Mocha} mocha - Mocha instance
 * @returns {Error} Error with code {@link constants.FORBIDDEN_EXCLUSIVITY}
 */
function createForbiddenExclusivityError(mocha) {
    const error = new ForbiddenExclusivityError(
        mocha.isWorker
            ? "`.only` is not supported in parallel mode"
            : "`.only` forbidden by --forbid-only"
    );
    error.code = constants.FORBIDDEN_EXCLUSIVITY;
    return error;
}

class TimeoutError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
    timeout: any;
    file: any;
}

/**
 * Creates an error object to be thrown when a runnable exceeds its allowed run time.
 * @static
 * @param {string} msg - Error message
 * @param {number} [timeout] - Timeout in ms
 * @param {string} [file] - File, if given
 * @returns {MochaTimeoutError}
 */
function createTimeoutError(msg, timeout, file) {
    const error = new TimeoutError(msg);
    error.code = constants.TIMEOUT;
    error.timeout = timeout;
    error.file = file;
    return error;
}

class UnparsableFileError extends Error {
    constructor(message: string) {
        super(message);
    }

    code: string;
}

/**
 * Creates an error object to be thrown when file is unparsable
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} filename - File name
 * @returns {Error} Error with code {@link constants.UNPARSABLE_FILE}
 */
function createUnparsableFileError(message, filename) {
    const error = new UnparsableFileError(message);
    error.code = constants.UNPARSABLE_FILE;
    return error;
}

/**
 * Returns `true` if an error came out of Mocha.
 * _Can suffer from false negatives, but not false positives._
 * @static
 * @public
 * @param {*} error - Error, or anything
 * @returns {boolean}
 */
const isMochaError = (error) =>
    Boolean(error && typeof error === "object" && MOCHA_ERRORS.has(error.code));

export {
    constants,
    createFatalError,
    createForbiddenExclusivityError,
    createInvalidArgumentTypeError,
    createInvalidArgumentValueError,
    createInvalidExceptionError,
    createInvalidInterfaceError,
    createInvalidLegacyPluginError,
    createInvalidReporterError,
    createMissingArgumentError,
    createMochaInstanceAlreadyDisposedError,
    createMochaInstanceAlreadyRunningError,
    createMultipleDoneError,
    createNoFilesMatchPatternError,
    createTimeoutError,
    createUnparsableFileError,
    createUnsupportedError,
    deprecate,
    isMochaError,
    warn,
};

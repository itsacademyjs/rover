import path from "path";
import url from "url";

const formattedImport = async (file: string) => {
    if (path.isAbsolute(file)) {
        try {
            return await import(url.pathToFileURL(file).toString());
        } catch (error) {
            /* This is a hack created because ESM in Node.js (at least in Node v15.5.1) does not emit
             * the location of the syntax error in the error thrown.
             * This is problematic because the user can't see what file has the problem,
             * so we add the file location to the error.
             * This `if` should be removed once Node.js fixes the problem.
             */
            if (
                error instanceof SyntaxError &&
                error.message &&
                error.stack &&
                !error.stack.includes(file)
            ) {
                const newErrorWithFilename = new SyntaxError(error.message);
                newErrorWithFilename.stack = error.stack.replace(
                    /^SyntaxError/,
                    `SyntaxError[ @${file} ]`
                );
                throw newErrorWithFilename;
            }
            throw error;
        }
    }
    return import(file);
};

const hasStableEsmImplementation = (() => {
    const [major, minor] = process.version.split(".");
    // ESM is stable from v12.22.0 onward
    // https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules
    const majorNumber = parseInt(major.slice(1), 10);
    const minorNumber = parseInt(minor, 10);
    return majorNumber > 12 || (majorNumber === 12 && minorNumber >= 22);
})();

const implementationOfRequireOrImportForUnstableEsm = async (file: string) => {
    if (path.extname(file) === ".mjs") {
        return formattedImport(file);
    }
    /* This is currently the only known way of figuring out whether a file is CJS or ESM in
     * Node.js that doesn't necessitate calling `import` first.
     */
    try {
        return require(file);
    } catch (error) {
        if (error.code === "ERR_REQUIRE_ESM") {
            return formattedImport(file);
        } else {
            throw error;
        }
    }
};

const dealWithExports = (module) => {
    if (module.default) {
        return module.default;
    } else {
        return { ...module, default: undefined };
    }
};

export const requireOrImport = hasStableEsmImplementation
    ? async (file) => {
          if (path.extname(file) === ".mjs") {
              return formattedImport(file);
          }
          try {
              return dealWithExports(await formattedImport(file));
          } catch (err) {
              if (
                  err.code === "ERR_MODULE_NOT_FOUND" ||
                  err.code === "ERR_UNKNOWN_FILE_EXTENSION" ||
                  err.code === "ERR_UNSUPPORTED_DIR_IMPORT"
              ) {
                  try {
                      return require(file);
                  } catch (requireErr) {
                      if (requireErr.code === "ERR_REQUIRE_ESM") {
                          // This happens when the test file is a JS file, but via type:module is actually ESM,
                          // AND has an import to a file that doesn't exist.
                          // This throws an `ERR_MODULE_NOT_FOUND` // error above,
                          // and when we try to `require` it here, it throws an `ERR_REQUIRE_ESM`.
                          // What we want to do is throw the original error (the `ERR_MODULE_NOT_FOUND`),
                          // and not the `ERR_REQUIRE_ESM` error, which is a red herring.
                          throw err;
                      } else {
                          throw requireErr;
                      }
                  }
              } else {
                  throw err;
              }
          }
      }
    : implementationOfRequireOrImportForUnstableEsm;

export const loadFilesAsync = async (
    files: string[],
    preLoadFunc,
    postLoadFunc
) => {
    for (const file of files) {
        preLoadFunc(file);
        const result = await exports.requireOrImport(path.resolve(file));
        postLoadFunc(file, result);
    }
};

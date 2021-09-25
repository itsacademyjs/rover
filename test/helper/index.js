const constants = require("./constants");

const assertThrowsAsync = async (
    callback,
    assertMessage,
    type = null,
    errorMessage = null
) => {
    try {
        await callback();
    } catch (error) {
        if (type) {
            assert.instanceOf(
                error,
                type,
                `Exception should be of type ${type.name}`
            );
        }

        if (errorMessage) {
            assert.strictEqual(error.message);
        }

        return;
    }

    assert.fail(assertMessage || "Expected an exception to be thrown");
};

module.exports = {
    assertThrowsAsync,
    ...constants,
};

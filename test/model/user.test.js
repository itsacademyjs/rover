const User = require("../../app/model/user");
const { users, assertThrowsAsync } = require("../helper");

describe("User model", () => {
    let userTemplate = null;

    beforeEach(() => {
        [userTemplate] = users;
    });

    afterEach(() => {
        userTemplate = null;
    });

    it("should be created with correct data", async () => {
        const user = new User({ ...userTemplate });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
    });

    it("should not be created when first name is undefined", async () => {
        const user = new User({
            ...userTemplate,
            firstName: undefined,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The first name attribute is required."
        );
    });

    it("should not be created when first name is null", async () => {
        const user = new User({
            ...userTemplate,
            firstName: null,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The first name attribute is required."
        );
    });

    it("should not be created when first name is empty", async () => {
        const user = new User({
            ...userTemplate,
            firstName: "",
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The first name attribute is required."
        );
    });

    it("should be created when first name length is 1", async () => {
        const user = new User({
            ...userTemplate,
            firstName: "A",
        });
        await user.save();
        // TODO
    });

    it("should not be created when first name is too long", async () => {
        const user = new User({
            ...userTemplate,
            firstName: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // 31 characters
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The first name attribute is should a maximum of 30 characters."
        );
    });

    it("should not be created when last name is undefined", async () => {
        const user = new User({
            ...userTemplate,
            lastName: undefined,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The last name attribute is required."
        );
    });
    it("should not be created when last name is null", async () => {
        const user = new User({
            ...userTemplate,
            lastName: null,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The last name attribute is required."
        );
    });

    it("should not be created when last name is empty", async () => {
        const user = new User({
            ...userTemplate,
            lastName: "",
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The last name attribute is required."
        );
    });

    it("should be created when last name length is 1", async () => {
        const user = new User({
            ...userTemplate,
            lastName: "A",
        });
        await user.save();
        // TODO
    });

    it("should not be created when last name is too long", async () => {
        const user = new User({
            ...userTemplate,
            lastName: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // 31 characters
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The last name attribute should not be longer than 30 characters."
        );
    });

    it("should not be created when user name is undefined", async () => {
        const user = new User({
            ...userTemplate,
            userName: undefined,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The user name attribute is required."
        );
    });

    it("should not be created when user name is null", async () => {
        const user = new User({
            ...userTemplate,
            userName: null,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The user name attribute is required."
        );
    });

    it("should not be created when user name is empty", async () => {
        const user = new User({
            ...userTemplate,
            userName: "",
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The user name attribute is required."
        );
    });

    it("should not be created when user name is too short", async () => {
        const user = new User({
            ...userTemplate,
            userName: "a",
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The user name attribute should be at least 3 characters long."
        );
    });

    it("should not be created when user name is too long", async () => {
        const user = new User({
            ...userTemplate,
            userName: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // 31 characters
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The user name attribute should not be longer than 30 characters."
        );
    });

    // it("should not be created when user name does not match regex", async () => {
    //     const user = new User({
    //         ...userTemplate,
    //         userName: "$$$@@@@",
    //     });
    //     await assertThrowsAsync(
    //         async () => user.save(),
    //         "The user name attribute should match the regex pattern."
    //     );
    // });

    it("should not be created when user name is not unique", async () => {
        /* Load the indexes created by MongoDB. */
        await User.init();

        const user1 = new User({
            ...userTemplate,
            userName: "itssamuelrowe",
        });
        await user1.save();
        assert.isFalse(
            user1.isNew,
            "The first user should be persisted to the database."
        );

        const user2 = new User({
            ...users[1],
            userName: "itssamuelrowe",
        });
        await assertThrowsAsync(
            async () => user2.save(),
            "The user name attribute should be unique."
        );
    });

    it("when about is undefined, should be created with null", async () => {
        const user = new User({
            ...userTemplate,
            about: undefined,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.about,
            null,
            "The about attribute should default to null."
        );
    });

    it("should be created when the about attribute is null", async () => {
        const user = new User({
            ...userTemplate,
            about: null,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.about,
            null,
            "The about attribute should accept null values."
        );
    });

    it("should be created when about is empty", async () => {
        const user = new User({
            ...userTemplate,
            about: "",
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.about,
            "",
            "The about attribute should be an empty string."
        );
    });

    it("should not be created when about is too long", async () => {
        const user = new User({
            ...userTemplate,
            about:
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
                "AAAAAAAAAAAAA", // 513 characters
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The about attribute should not be longer than 512 characters."
        );
    });

    it("should be created when gender is undefined", async () => {
        const user = new User({
            ...userTemplate,
            gender: undefined,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.gender,
            undefined,
            "The gender attribute should default to undefined."
        );
    });

    it("should not be created when gender is null", async () => {
        const user = new User({
            ...userTemplate,
            gender: null,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The gender attribute should not be null."
        );
    });

    it("should not be created when gender is invalid", async () => {
        const user = new User({
            ...userTemplate,
            gender: "invalid_gender_value",
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The gender attribute should be valid."
        );
    });

    it("should be created when country code is undefined", async () => {
        const user = new User({
            ...userTemplate,
            countryCode: undefined,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.countryCode,
            undefined,
            "The country code attribute should default to undefined."
        );
    });

    it("should not be created when country code is null", async () => {
        const user = new User({
            ...userTemplate,
            countryCode: null,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The country code attribute should not be null."
        );
    });

    it("should not be created when country code is invalid", async () => {
        const user = new User({
            ...userTemplate,
            countryCode: "invalid_country_code_value",
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The country code attribute should be valid."
        );
    });

    it("should not created when email address is not unique", async () => {
        /* Load the indexes created by MongoDB. */
        await User.init();

        const user1 = new User({
            ...userTemplate,
            emailAddress: "samuel@blogpod.io",
        });
        await user1.save();
        assert.isFalse(
            user1.isNew,
            "The first user should be persisted to the database."
        );

        const user2 = new User({
            ...users[1],
            emailAddress: "samuel@blogpod.io",
        });
        await assertThrowsAsync(
            async () => user2.save(),
            "The email address attribute should be unique."
        );
    });

    it("when email verified attribute is missing, should be created with default as false", async () => {
        const user = new User({
            ...userTemplate,
            emailVerified: undefined,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.isFalse(
            user.emailVerified,
            "The email verified attribute should false."
        );
    });

    it("should be created with null, when picture URL attribute is undefined", async () => {
        const user = new User({
            ...userTemplate,
            pictureURL: undefined,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.pictureURL,
            null,
            "The picture URL attribute should null."
        );
    });

    it("should be created with picturl URL as null", async () => {
        const user = new User({
            ...userTemplate,
            pictureURL: null,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.pictureURL,
            null,
            "The picture URL attribute should null."
        );
    });

    it("should be created with 'en', when displayLanguageCode attribute is undefined", async () => {
        const user = new User({
            ...userTemplate,
            displayLanguageCode: undefined,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.displayLanguageCode,
            "en",
            "The displayLanguageCode attribute should 'en'."
        );
    });

    it("should not be created when displayLanguageCode is invalid", async () => {
        const user = new User({
            ...userTemplate,
            displayLanguageCode: "invalid_display_language_code_value",
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The displayLanguageCode attribute should not be invalid."
        );
    });

    it("should not created when displayLanguageCode attribute is null", async () => {
        const user = new User({
            ...userTemplate,
            displayLanguageCode: null,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The displayLanguageCode attribute should not be null."
        );
    });

    it("should be created with 'active', when status attribute is undefined", async () => {
        const user = new User({
            ...userTemplate,
            status: undefined,
        });
        await user.save();
        assert.isFalse(
            user.isNew,
            "The user should be persisted to the database."
        );
        assert.strictEqual(
            user.status,
            "active",
            "The status attribute should 'active'."
        );
    });

    it("should not be created when status is invalid", async () => {
        const user = new User({
            ...userTemplate,
            status: "invalid_status_value",
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The status attribute should not be invalid."
        );
    });

    it("should not created when status attribute is null", async () => {
        const user = new User({
            ...userTemplate,
            status: null,
        });
        await assertThrowsAsync(
            async () => user.save(),
            "The status attribute should not be null."
        );
    });

    // TODO: roles, birthday, interests, contentLanguageCodes
});

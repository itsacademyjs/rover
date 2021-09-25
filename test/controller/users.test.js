/* eslint-disable no-empty-function */

const request = require("supertest");
const { users } = require("../helper");
const { identifierPattern } = require("../../app/util/constants");

const [testUser] = users;

describe("User controller", () => {
    it("POST /users/session -- should create a new session", async function () {
        const { body } = await request(this.test.app)
            .post("/api/v1/users/session")
            .expect("Content-Type", /json/)
            .expect(201);

        assert.isTrue(
            identifierPattern.test(body.id),
            "The corect ObjectId should be returned."
        );

        assert.strictEqual(
            testUser.firstName,
            body.firstName,
            "The specified first name should be used by the endpoint."
        );

        assert.strictEqual(
            testUser.lastName,
            body.lastName,
            "The specified last name should be used by the endpoint."
        );

        assert.strictEqual(
            body.userName,
            body.id,
            "By default, the user name should be equal to the ObjectId."
        );

        assert.strictEqual(
            testUser.pictureURL,
            body.pictureURL,
            "The specified picture URL should be used by the endpoint."
        );

        assert.strictEqual(
            testUser.emailAddress,
            body.emailAddress,
            "The specified email address should be used by the endpoint."
        );

        assert.strictEqual(
            testUser.emailVerified,
            body.emailVerified,
            "The specified email verified flag should be used by the endpoint."
        );

        assert.deepEqual(
            ["regular"],
            body.roles,
            "By default, a user should be created with the regular role."
        );

        assert.isNull(body.birthday, "By default, birthday should be null.");

        assert.deepEqual(
            ["en"],
            body.contentLanguageCodes,
            "By default, content language codes should be ['en']."
        );

        assert.strictEqual(
            "en",
            body.displayLanguageCode,
            "By default, the display language code should be 'en'."
        );

        assert.strictEqual(
            "",
            body.about,
            "By default, about should be an empty string."
        );

        // TODO: Assertions for createdAt and updatedAt.
    });

    it("PATCH /users/:id -- should update the specified user", async function () {});

    it("PATCH /users/:id -- should fail with status code 404 for unauthorized users", async function () {});

    it("PATCH /users/:id -- should fail with status code 400 for bad requests", async function () {});

    it("PATCH /users/user-name -- should update user name", async function () {});

    it("PATCH /users/user-name -- should fail with status code 400 for existing user names", async function () {});

    it("PATCH /users/user-name -- should fail with status code 400 for invalid user names", async function () {});

    it("GET /users -- should list the first twenty users, by default.", async function () {});

    it("GET /users -- should list the correct records when page is specified.", async function () {});

    it("GET /users -- should fail with status code 400 when page number is negative.", async function () {});

    it("GET /users -- should return an empty list when page number does not exist.", async function () {});

    it("GET /users -- should list the correct records when limit is specified.", async function () {});

    it("GET /users -- should fail with status code 400 when limit is below minimum.", async function () {});

    it("GET /users -- should fail with status code 400 when limit is above maximum.", async function () {});
});

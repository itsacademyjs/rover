const Article = require("../../app/model/article");
const User = require("../../app/model/user");
const { users, articles, assertThrowsAsync } = require("../helper");

describe("Article model", () => {
    let user1 = null;
    let user2 = null;
    let articleTemplate = null;

    beforeEach(async () => {
        user1 = new User(users[0]);
        await user1.save();

        user2 = new User(users[1]);
        await user2.save();

        articleTemplate = {
            ...articles[0],
            author: user1._id,
            narrator: user2._id,
        };
    });

    afterEach(async () => {
        user1 = null;
        user2 = null;
        articleTemplate = null;
    });

    it("should be created with correct data", async () => {
        const article = new Article({ ...articleTemplate });
        await article.save();
        assert.isFalse(
            article.isNew,
            "The article should be persisted to the database."
        );
    });

    it("should not be created with undefined title", async () => {
        const article = new Article({
            ...articleTemplate,
            title: undefined,
        });
        await assertThrowsAsync(
            () => article.save(),
            "The title attribute is required."
        );
    });

    it("should not be created with null title", async () => {
        const article = new Article({
            ...articleTemplate,
            title: null,
        });
        await assertThrowsAsync(
            () => article.save(),
            "The title attribute is required."
        );
    });

    it("should not be created with empty title", async () => {
        const article = new Article({
            ...articleTemplate,
            title: "",
        });
        await assertThrowsAsync(
            () => article.save(),
            "The title attribute should be at least 10 characters long."
        );
    });

    it("should not be created with empty title, after trimming", async () => {
        const article = new Article({
            ...articleTemplate,
            title: "    \t\t    ",
        });
        await assertThrowsAsync(
            () => article.save(),
            "The title attribute should be at least 10 characters long."
        );
    });

    it("should not be created with undefined author", async () => {
        const article = new Article({
            ...articleTemplate,
            author: undefined,
        });
        await assertThrowsAsync(
            () => article.save(),
            "The author attribute is required."
        );
    });

    it("should not be created with null author", async () => {
        const article = new Article({
            ...articleTemplate,
            author: null,
        });
        await assertThrowsAsync(
            () => article.save(),
            "The author attribute is required."
        );
    });

    it("should not be created with undefined narrator", async () => {
        const article = new Article({
            ...articleTemplate,
            narrator: undefined,
        });
        await assertThrowsAsync(
            () => article.save(),
            "The narrator attribute is required."
        );
    });

    it("should not be created with null narrator", async () => {
        const article = new Article({
            ...articleTemplate,
            narrator: null,
        });
        await assertThrowsAsync(
            () => article.save(),
            "The narrator attribute is required."
        );
    });

    it("should create when both author and narrator are the same users", async () => {
        const article = new Article({
            ...articleTemplate,
            author: user1._id,
            narrator: user1._id,
        });
        await article.save();
        assert.isFalse(
            article.isNew,
            "The article should be persisted to the database."
        );
        assert.isTrue(
            article.author.equals(article.narrator),
            "The author ObjectId should be equal to narrator ObjectId."
        );
    });

    it("when tags is undefined, should be created with default as [].", async () => {
        const article = new Article({
            ...articleTemplate,
            tags: undefined,
        });
        await article.save();
        assert.isFalse(
            article.isNew,
            "The article should be persisted to the database."
        );
        assert.strictEqual(
            article.tags.length,
            0,
            "The tags array should be empty."
        );
    });

    it("should not be created when tags includes an invalid value", async () => {
        const article = new Article({
            ...articleTemplate,
            tags: ["invalid_tag_value"],
        });
        await assertThrowsAsync(
            () => article.save(),
            "The tags attribute should not contain an invalid value."
        );
    });

    it("should not be created when slug is null", async () => {
        const article = new Article({
            ...articleTemplate,
            slug: null,
        });
        await assertThrowsAsync(
            () => article.save(),
            "The slug attribute is required."
        );
    });

    it("should not be created when slug is undefined", async () => {
        const article = new Article({
            ...articleTemplate,
            slug: undefined,
        });
        await assertThrowsAsync(
            () => article.save(),
            "The slug attribute is required."
        );
    });

    /* This test case is valid because other than the `_id` attribute, the `slug` attribute is the
     * only unique attribute.
     */
    it("should not be created when slug is not unique", async () => {
        const article1 = new Article({
            ...articleTemplate,
        });
        await article1.save();
        assert.isFalse(
            article1.isNew,
            "The first article should be persisted to the database."
        );

        /* The `unique` attribute in Mongoose is not a validator. It is a helper to build indexes.
         * Two documents with the same values for a unique attribute may successfully be persisted
         * depending on whether MongoDB built the index before writing the documents. Therefore, we
         * need to wait for MongoDB to finish building the index before continuing.
         *
         * See the section "The unique Option is Not a Validator" for more information.
         * https://mongoosejs.com/docs/validation.html
         */
        await Article.init();

        const article2 = new Article({
            ...articleTemplate,
        });
        await assertThrowsAsync(
            () => article2.save(),
            "The slug attribute should be unique."
        );
    });

    it("when audioURL is missing, should be created with default as null.", async () => {
        const article = new Article({
            ...articleTemplate,
            audioURL: undefined,
        });
        await article.save();
        assert.isFalse(
            article.isNew,
            "The article should be persisted to the database."
        );
        assert.isNull(
            article.audioURL,
            "The audioURL attribute should be null."
        );
    });

    it("when imageURLs is missing, should be created with default as [].", async () => {
        const article = new Article({
            ...articleTemplate,
            imageURLs: undefined,
        });
        await article.save();
        assert.isFalse(
            article.isNew,
            "The article should be persisted to the database."
        );
        assert.strictEqual(
            article.imageURLs.length,
            0,
            "The imageURLs attribute should be an empty list."
        );
    });

    it('when languageCode is missing, should be created with default as "en"', async () => {
        const article = new Article({
            ...articleTemplate,
            languageCode: undefined,
        });
        await article.save();
        assert.isFalse(
            article.isNew,
            "The article should be persisted to the database."
        );
        assert.strictEqual(
            article.languageCode,
            "en",
            "The languageCode attribute should 'en'."
        );
    });

    it("when published is missing, should be created with default as false", async () => {
        const article = new Article({
            ...articleTemplate,
            published: undefined,
        });
        await article.save();
        assert.isFalse(
            article.isNew,
            "The article should be persisted to the database."
        );
        assert.isFalse(
            article.published,
            "The published attribute should false."
        );
    });
});

const users = [
    {
        firstName: "Samuel",
        lastName: "Rowe",
        userName: "itssamuelrowe",
        about: `With entrepreneurship and software development, there is always something new to
                discover. Designing a platform that is truly helpful to millions of users is my ultimate goal.

                I mostly work with the MERN stack these days. I love learning and working with new technologies.
                THAT'S MY NINJA WAY!`,
        gender: "male",
        countryCode: "IND",
        pictureURL: "http://picsum.photos/300/300",
        emailAddress: "samuel@blogpod.io",
        emailVerified: true,
        roles: ["regular"],
        birthday: null,
        interestes: [],
        contentLanguageCodes: ["en"],
        displayLanguageCode: "en",
        status: "active",
    },
    {
        firstName: "Joel",
        lastName: "Rego",
        userName: "joelerego",
        about: `With entrepreneurship and software development, there is always something new to
                discover. Designing a platform that is truly helpful to millions of users is my ultimate goal.

                I mostly work with the MERN stack these days. I love learning and working with new technologies.
                THAT'S MY NINJA WAY!`,
        gender: "male",
        countryCode: "IND",
        pictureURL: "http://picsum.photos/300/300",
        emailAddress: "joel@blogpod.io",
        emailVerified: true,
        roles: ["regular"],
        birthday: null,
        interestes: [],
        contentLanguageCodes: ["en"],
        displayLanguageCode: "en",
        status: "active",
    },
    {
        firstName: "Akshay",
        lastName: "Likith",
        userName: "akshayblikith",
        about: `With entrepreneurship and software development, there is always something new to
                discover. Designing a platform that is truly helpful to millions of users is my ultimate goal.

                I mostly work with the MERN stack these days. I love learning and working with new technologies.
                THAT'S MY NINJA WAY!`,
        gender: "male",
        countryCode: "IND",
        pictureURL: "http://picsum.photos/300/300",
        emailAddress: "akshay@blogpod.io",
        emailVerified: true,
        roles: ["regular"],
        birthday: null,
        interestes: [],
        contentLanguageCodes: ["en"],
        displayLanguageCode: "en",
        status: "active",
    },
];

const articles = [
    {
        title: "How to Apply to Google Summer of Code",
        description: `Google Summer of Code (GSoC) is a program organized by Google once a year, where
        selected students from all around the world participate and contribute to open-source
        projects for three months. The primary goal of this program is to introduce and encourage
        students to participate in open-source development. What’s more? GSoC was founded by Larry
        Page and Sergey Brin themselves!`,
        transcript: `Google Summer of Code (GSoC) is a program organized by Google once a year, where
            selected students from all around the world participate and contribute to open-source
            projects for three months. The primary goal of this program is to introduce and encourage
            students to participate in open-source development. What’s more? GSoC was founded by Larry
            Page and Sergey Brin themselves!

            In this article, I’ll talk about my journey to GSoC 2020, including how I shortlisted
            the organizations and wrote a clear proposal to improve my chances of getting selected.
            I hope this article helps anyone interested in applying to GSoC. You can find my
            application here.`,
        author: null,
        narrator: null,
        tags: [],
        slug: "how-to-apply-to-google-summer-of-code",
        audioURL:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        imageURLs: [],
        languageCode: "en",
        published: false,
    },
];

module.exports = {
    users,
    articles,
};

module.exports = {
    diff: true,
    extension: ["js", "cjs", "mjs"],
    package: "./package.json",
    reporter: "json_all",
    slow: 75,
    timeout: 2000,
    ui: "qunit",
    "watch-ignore": ["node_modules", ".git"],
    dryRun: false,
};

// Alias exports to a their normalized format Mocha#reporter to prevent a need
// for dynamic (try/catch) requires, which Browserify doesn't handle.

export { default as Base, default as base } from "./base";

export { default as Dot, default as dot } from "./dot";
export { default as Doc, default as doc } from "./doc";
export { default as Tap, default as tap } from "./tap";
export { default as JSON, default as json } from "./json";
export { default as HTML, default as html } from "./html";
export { default as List, default as list } from "./list";
export { default as Min, default as min } from "./min";
export { default as Spec, default as spec } from "./spec";
export { default as Nyan, default as nyan } from "./nyan";
export { default as XUnit, default as xunit } from "./xunit";
export { default as Markdown, default as markdown } from "./markdown";
export { default as Progress, default as progress } from "./progress";
export { default as Landing, default as landing } from "./landing";
export { default as JSONStream, default as json_stream } from "./json-stream";
export { default as JSONAll, default as json_all } from "./json-all";

import fs from "fs";
export * from "./executor";

const readJSONFile = async (path): Promise<any> => {
    const json = await fs.promises.readFile(path, {
        encoding: "utf8",
    });
    const object = JSON.parse(json);
    return object;
};

export { readJSONFile };

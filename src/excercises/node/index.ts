import factorial from "./factorial";
import helloWorld from "./hello-world";

export default {
    [factorial.handle]: factorial,
    [helloWorld.handle]: helloWorld,
};

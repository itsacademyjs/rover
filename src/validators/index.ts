import SSValidatorV1 from "./ss-validator-v1";
import NodeValidatorV1 from "./node-validator-v1";
import FSValidatorV1 from "./fs-validator-v1";

const validators = {
    "ss-validator/v1": SSValidatorV1,
    "node-validator/v1": NodeValidatorV1,
    "fs-validator/v1": FSValidatorV1,
};

export default validators;

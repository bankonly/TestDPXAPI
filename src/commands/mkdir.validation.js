const { LOG, Mkdir } = require("../utils/common-func");
const METHOD = "Validation";
const FILE_TYPE = ".validation.js";
let WRITE_PATH = "./src/validations/";
const READ_FILE = WRITE_PATH + "example.validation.js";

try {
  Mkdir({
    read_file: READ_FILE,
    write_path: WRITE_PATH,
    file_type: FILE_TYPE,
    method: METHOD,
  });
} catch (error) {
  LOG(error.message);
}

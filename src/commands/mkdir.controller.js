const { LOG, Mkdir } = require("../utils/common-func");
const METHOD = "Controller";
const FILE_TYPE = ".controller.js";
let WRITE_PATH = "./src/controllers/";
const READ_FILE = WRITE_PATH + "example.controller.js";

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

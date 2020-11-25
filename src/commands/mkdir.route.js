const { LOG, Mkdir } = require("../utils/common-func");
const METHOD = "Route";
const FILE_TYPE = ".route.js";
let WRITE_PATH = "./src/routes/";
const READ_FILE = WRITE_PATH + "example.route.js";

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

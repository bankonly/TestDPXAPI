const Res = require("ssv-response");
const Utils = require("ssv-utils");
const Jwt = require("jsonwebtoken");
const fs = require("fs");

const LOG = (msg) => console.log(msg);
module.exports.LOG = LOG;
module.exports.DB_TIMESTAMP_CONFIG = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};
module.exports.Res = Res;

module.exports.JwtGenerator = (payload) => {
  const token = Jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFE_TIME });
  const refresh_token = Jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_TOKEN_LIFE_TIME });
  return { token, refresh_token };
};

module.exports.JwtGeneratorResetToken = (payload) => {
  const token = Jwt.sign(payload, process.env.RESET_PWD_SECRET_KEY, { expiresIn: process.env.RESET_PWD_TOKEN_LIFE_TIME });
  return { token };
};

module.exports.GetFullUrl = (req) => `${req.protocol}://${req.headers.host}${req.originalUrl}`;
module.exports._ = Utils;
module.exports.Mkdir = ({ write_path, file_type, read_file, method }) => {
  // get file_name and path
  let file_name = process.argv[process.argv.length - 1];
  const commands = file_name.split("/");

  // if there is path
  if (commands.length > 1) {
    file_name = commands[1];
    write_path = write_path.concat(commands[0].toString().toLowerCase() + "/");
    if (!fs.existsSync(write_path)) {
      fs.mkdirSync(write_path);
    }
  }

  // convert file to lowercase
  let replace_file_name = file_name;
  file_name = file_name.toLowerCase() + file_type;

  // check if file is exist
  if (fs.existsSync(write_path + file_name)) throw new Error(`${file_name} already exist`);

  // read example file
  let write_data = fs.readFileSync(read_file, "utf8");
  write_data = write_data.replace(/ExampleSmall/g, replace_file_name.toLowerCase());
  write_data = write_data.replace(/Example/g, replace_file_name);
  fs.writeFileSync(write_path + file_name, write_data);
  LOG(method + ": " + file_name + " has created");
};

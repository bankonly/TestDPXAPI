const mongoose = require("mongoose");
const { DB_TIMESTAMP_CONFIG } = require("../utils/common-func");

const model_name = "user";

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: null },
    img: { type: String, default: null },
    deleted_at: { type: Date, default: null },
  },
  DB_TIMESTAMP_CONFIG
);

const UserModel = mongoose.model(model_name, schema, model_name);

module.exports = UserModel;
module.exports.UserModelName = model_name;

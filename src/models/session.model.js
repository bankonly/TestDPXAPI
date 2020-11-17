const mongoose = require("mongoose");
const { DB_TIMESTAMP_CONFIG } = require("../utils/common-func");
const { UserModelName } = require("./user.model");

const model_name = "session";

const schema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: UserModelName, default: null },
    url: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: Boolean, required: true },
    response: { type: String, default: null },
    deleted_at: { type: Date, default: null },
  },
  DB_TIMESTAMP_CONFIG
);

const SessionModel = mongoose.model(model_name, schema, model_name);

module.exports = SessionModel;
module.exports.SessionModelName = model_name;

const Res = require("ssv-response");

module.exports.LOG = (msg) => console.log(msg);
module.exports.DB_TIMESTAMP_CONFIG = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};
module.exports.Res = Res;

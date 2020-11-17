const Res = require("ssv-response");
const Utils = require("ssv-utils");
const Jwt = require("jsonwebtoken");

module.exports.LOG = (msg) => console.log(msg);
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
module.exports.GetFullUrl = (req) => `${req.protocol}://${req.headers.host}${req.originalUrl}`;
module.exports._ = Utils;

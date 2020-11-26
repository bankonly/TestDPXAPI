const Catcher = require("./async");
const { JwtAuth } = require("ssv-middleware");
const { _ } = require("../utils/common-func");
const UserModel = require("../models/user.model");

const Auth = Catcher(
  async (req, res, next) => await JwtAuth({ model: UserModel, secret_key: process.env.SECRET_KEY }).initial(req, res, next),
  false, // useTransaction = false
  true // is middleware = true
);

module.exports = Auth;

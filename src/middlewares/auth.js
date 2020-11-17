const Catcher = require("./async");
const Jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { _ } = require("../utils/common-func");

const Auth = Catcher(async (req, res, next) => {
  if (!req.headers.authorization) throw new Error("401::unauthorized");

  let authorization = req.headers.authorization.split(" ");
  if (authorization.length > 1) {
    authorization = authorization[1];
  } else {
    authorization = authorization[0];
  }

  try {
    const decode_jwt = Jwt.decode(authorization, process.env.SECRET_KEY);
    if (!_.validateObjectId(decode_jwt._id.toString())) {
      throw new Error("401::unauthorized");
    }
    const found_user = await UserModel.findById(decode_jwt._id).select("-password");
    if (found_user.deleted_at !== null) throw new Error("401::unauthorized");

    req.user = found_user;
  } catch (error) {
    throw new Error("401::unauthorized");
  }
  return next();
});

module.exports = Auth;

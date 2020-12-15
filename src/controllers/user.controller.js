const Catcher = require("../middlewares/async");
const { Res, _, JwtGenerator } = require("../utils/common-func");
const UserModel = require("../models/user.model");
const SessionController = require("./session.controller");
const OtpController = require("./otp.controller");
const { auth } = require("firebase-admin");
const Mongo = require("../utils/mongo-query");

const UserController = {
  register: Catcher(async (req, res) => {
    const resp = new Res(res);
    const body = req.body;

    body.password = await _.bcryptFn.hashPassword(body.password);
    const created_user = await UserModel.create(body);

    const payload = { _id: created_user._id };
    const access_credential = JwtGenerator(payload);

    return resp.success({ data: access_credential });
  }),

  login: Catcher(async (req, res) => {
    const resp = new Res(res);
    const found_user = req.body.found_user;
    const body = req.body;

    const payload = { _id: found_user._id };
    const access_credential = JwtGenerator(payload);

    return resp.success({ data: access_credential });
  }),

  profile: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({ data: req.user });
  }),

  sendOtpCode: Catcher(async (req, res, next, opts) => {
    const resp = new Res(res);
    const token = await OtpController.sendOtpCode({ model: UserModel, req, opts });
    return resp.success({ data: token });
  }, true),

  verityOtp: Catcher(async (req, res) => {
    const resp = new Res(res);
    await OtpController.verifyOtp({ req, auth: req.user });
    return resp.success({});
  }),

  resetPassword: Catcher(async (req, res) => {
    const resp = new Res(res);
    await OtpController.resetPassword(UserModel, { req });
    return resp.success({});
  }),

  changePassword: Catcher(async (req, res) => {
    const resp = new Res(res);

    const password = req.body.password;
    const new_password = req.body.new_password;

    // Find old password
    const found_user = await Mongo.findById(UserModel, { _id: req.user._id,select:"-__v" });

    const verify_password = await _.bcryptFn.verifyPassword(password, found_user.password);
    if (!verify_password) throw new Error(`400::invalid password`);

    found_user.password = await _.bcryptFn.hashPassword(new_password);
    await found_user.save();

    return resp.success({});
  }),
};

module.exports = UserController;

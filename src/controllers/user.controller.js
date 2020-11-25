const Catcher = require("../middlewares/async");
const { Res, _, JwtGenerator } = require("../utils/common-func");
const UserModel = require("../models/user.model");
const SessionController = require("./session.controller");
const OtpController = require("./otp.controller");
const { auth } = require("firebase-admin");

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
};

module.exports = UserController;

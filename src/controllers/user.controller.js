const Catcher = require("../middlewares/async");
const { Res, _ } = require("../utils/common-func");
const UserModel = require("../models/user.model");
const Jwt = require("jsonwebtoken");

const UserController = {
  register: Catcher(async (req, res) => {
    const resp = new Res(res);
    const body = req.body;

    body.password = await _.bcryptFn.hashPassword(body.password);
    const created_user = await UserModel.create(body);

    return resp.success({ data: created_user });
  }),
  login: Catcher(async (req, res) => {
    const resp = new Res(res);
    const found_user = req.body.found_user;
    const body = req.body;

    const payload = { _id: found_user._id };
    const token = Jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFE_TIME });
    return resp.success({ data: { token } });
  }),
  profile: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({ data: req.user });
  }),
};

module.exports = UserController;

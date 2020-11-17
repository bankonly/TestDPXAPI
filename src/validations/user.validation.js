const Catcher = require("../middlewares/async");
const UserModel = require("../models/user.model");
const Joi = require("@hapi/joi");
const { Mongo } = require("../utils/mongo-query");
const { _, RemoveSpace } = require("../utils/common-func");

const UserValidator = {
  register: Catcher(async (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      username: Joi.string().required().min(5),
      password: Joi.string().required().min(5),
      confirm_password: Joi.any().valid(Joi.ref("password")).required(),
    });
    await schema.validateAsync(req.body);

    req.body.email = _.removeSpace(req.body.email);
    req.body.username = _.removeSpace(req.body.username);

    await Mongo.findExist(UserModel, { condition: { username: req.body.username }, key: "username" });
    await Mongo.findExist(UserModel, { condition: { email: req.body.email }, key: "email" });

    next();
  }),
  login: Catcher(async (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      username: Joi.string().required().min(5),
      password: Joi.string().required().min(5),
    });

    req.body.username = _.removeSpace(req.body.username);
    
    await schema.validateAsync(body);
    const found_user = await Mongo.find(UserModel, { error_code: 400, throw_error: true, many: false, condition: { username: body.username } });
    const verfify_password = await _.bcryptFn.verifyPassword(body.password, found_user.password);
    if (!verfify_password) throw new Error(`400::invalid password`);

    body.found_user = found_user;
    next();
  }),
};

module.exports = UserValidator;

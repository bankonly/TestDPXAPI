const Catcher = require("../middlewares/async");
const Joi = require("@hapi/joi");

const OtpValidator = {
  resetPassword: Catcher(
    async (req, res, next) => {
      const schema = Joi.object({
        password: Joi.string().min(8).required(),
        confirm_password: Joi.any().valid(Joi.ref("password")).required(),
      });
      await schema.validateAsync(req.body);
      return next();
    },
    false,
    false
  ),
};

module.exports = OtpValidator;

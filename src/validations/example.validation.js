const Catcher = require("../middlewares/async");
const Joi = require("@hapi/joi");
const _ = require("ssv-utils");

const ExampleValidator = {
  create: Catcher(
    async (req, res, next) => {
      const body = req.body;
      const schema = Joi.object({
        key: Joi.string().required(),
      });
      await schema.validateAsync(req.body);
    },
    false,
    false
  ),
};

module.exports = ExampleValidator;

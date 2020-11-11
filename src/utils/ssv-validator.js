const { LOG } = require("./common-func");

const validate = (body, validate_rule) => {
  // get validate rule keys,body keys
  const rule_keys = Object.keys(validate_rule);
  const body_keys = Object.keys(body);

  const found_keys_in_validate_rule = rule_keys.filter((e) => !body_keys.includes(e));
  if (found_keys_in_validate_rule.length > 0) {
    for (let i = 0; i < found_keys_in_validate_rule.length; i++) {
      const rules = validate_rule[found_keys_in_validate_rule[i]];
      const rule_string = rules.toString().split(",");
      if (!rule_string.includes("optional")) {
        throw new Error(`400::${found_keys_in_validate_rule[i]} is requried`);
      }
    }
  }

  return true;
};

const validate_rule = {
  name: "required,string",
  password: "required,string",
  confirm_password: "required,string",
};

const body = {
  name: "Souksavanh",
  confirm_password: "123456789",
};

const validation = validate(body, validate_rule);
// LOG(validation);

module.exports.validate = validate;

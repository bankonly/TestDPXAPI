const Catcher = require("../middlewares/async");
const { Res } = require("../utils/common-func");

const UserController = {
  register: Catcher(async (req, res) => {
    const resp = new Res(res);

    return resp.success({});
  }),
};

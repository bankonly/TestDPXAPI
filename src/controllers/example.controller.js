const Catcher = require("../middlewares/async");
const { Res } = require("../utils/common-func");

const ExampleController = {
  list: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({});
  }),
  get: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({});
  }),
  create: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({});
  }),
  update: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({});
  }),
  remove: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({});
  }),
};

module.exports = ExampleController;

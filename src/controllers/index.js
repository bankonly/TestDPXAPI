const Catcher = require("../middlewares/async");
const Res = require("ssv-response");

const IndexController = {
  welcome: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({ msg: "Welcome!!" });
  }),
  aboutUs: Catcher(async (req, res) => {
    const resp = new Res(res);
    return resp.success({ msg: "About us", data: "platform api" });
  }),
};

module.exports = IndexController;

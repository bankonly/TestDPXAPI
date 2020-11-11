const Res = require("ssv-response");

const Catcher = function (handler) {
  return async (req, res, next) => {
    const resp = new Res(res);
    try {
      await handler(req, res, next);
    } catch (ex) {
      console.error(ex);
      return resp.somethingWrong({ error: ex });
    }
  };
};

module.exports = Catcher;

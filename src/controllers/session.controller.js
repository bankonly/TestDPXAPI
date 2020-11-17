const SessionModel = require("../models/session.model");
const { GetFullUrl, Res } = require("../utils/common-func");
const Catcher = require("../middlewares/async");
const { Mongo } = require("../utils/mongo-query");

const SessionController = {
  trackSession: async ({ req, status, message }) => {
    await SessionModel.create({
      user_id: req.user ? req.user._id : null,
      url: GetFullUrl(req),
      method: req.method,
      status,
      response: message,
    });
  },
  list: Catcher(async (req, res) => {
    const resp = new Res(res);
    const found_session = await Mongo.find(SessionModel, { populate: { path: "user_id", select: "username email img" } });
    return resp.success({ data: found_session });
  }),
};

module.exports = SessionController;

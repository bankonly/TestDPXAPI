const SessionModel = require("../models/session.model");
const { GetFullUrl, Res } = require("../utils/common-func");
const Catcher = require("../middlewares/async");
const { Mongo } = require("../utils/mongo-query");

const SessionController = {
  list: Catcher(async (req, res) => {
    const resp = new Res(res);
    const found_session = await Mongo.find(SessionModel, { populate: { path: "user_id", select: "username email img" } });
    return resp.success({ data: found_session });
  }),
  clear: Catcher(async (req, res) => {
    const resp = new Res(res);
    await SessionModel.deleteMany();
    return resp.success({});
  }),
};

module.exports = SessionController;

const SessionModel = require("../models/session.model");
const { GetFullUrl, Res, _ } = require("../utils/common-func");
const Catcher = require("../middlewares/async");
const Mongo = require("../utils/mongo-query");

const SessionController = {
  list: Catcher(async (req, res) => {
    const resp = new Res(res);
    let condition = {};
    if (req.query.user_id) {
      if (!_.isObjectId(req.query.user_id)) throw new Error("400::user_id invalid object Id");
      condition.user_id = req.query.user_id;
    }
    const found_session = await Mongo.find(SessionModel, {
      condition,
      populate: { path: "user_id", select: "username email img" },
      paginate: {
        paginate: true,
        page: req.query.page,
        limit: req.query.limit,
      },
    });
    return resp.success({ data: found_session });
  }),
  clear: Catcher(async (req, res) => {
    const resp = new Res(res);
    await SessionModel.deleteMany();
    return resp.success({});
  }),
};

module.exports = SessionController;

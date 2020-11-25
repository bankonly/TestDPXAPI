const Res = require("ssv-response");
const mongoose = require("mongoose");
const { TrackSession } = require("../utils/session");

const Catcher = function (handler, useTransaction = false, enableLog = false) {
  if (useTransaction) {
    return async (req, res, next) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      const resp = new Res(res);
      try {
        const opts = { session };
        await handler(req, res, next, opts);
        if (!enableLog) TrackSession({ req, status: true });
        await session.commitTransaction();
        session.endSession();
      } catch (ex) {
        if (!enableLog) TrackSession({ req, status: false, message: ex.message });
        await session.abortTransaction();
        session.endSession();
        return resp.somethingWrong({ error: ex });
      }
    };
  } else {
    return async (req, res, next) => {
      const resp = new Res(res);
      try {
        await handler(req, res, next);
        if (!enableLog) TrackSession({ req, status: true });
      } catch (ex) {
        if (!enableLog) TrackSession({ req, status: false, message: ex.message });
        return resp.somethingWrong({ error: ex });
      }
    };
  }
};

module.exports = Catcher;

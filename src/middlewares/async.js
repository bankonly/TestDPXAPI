const Res = require("ssv-response");
const mongoose = require("mongoose");

const Catcher = function (handler, useTransaction = false) {
  if (useTransaction) {
    return async (req, res, next) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      const resp = new Res(res);
      try {
        await handler(req, res, next);
        await session.commitTransaction();
        session.endSession();
      } catch (ex) {
        session.abortTransaction();
        session.endSession();
        return resp.somethingWrong({ error: ex });
      }
    };
  } else {
    return async (req, res, next) => {
      const resp = new Res(res);
      try {
        await handler(req, res, next);
      } catch (ex) {
        return resp.somethingWrong({ error: ex });
      }
    };
  }
};

module.exports = Catcher;

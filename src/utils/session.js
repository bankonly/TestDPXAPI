const SessionModel = require("../models/session.model");
const { GetFullUrl } = require("./common-func");

module.exports.TrackSession = async ({ req, status, message }) => {
  await SessionModel.create({
    user_id: req.user ? req.user._id : null,
    url: GetFullUrl(req),
    method: req.method,
    status,
    response: message,
  });
};

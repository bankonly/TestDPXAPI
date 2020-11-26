const IndexRouter = require("./index");
const UserRouter = require("./user.route");
const SessionRoute = require("./session.route");
const Auth = require("../middlewares/auth");
const OtpAuth = require("../middlewares/auth-reset-password");
const OtpRouter = require("./otp.route");

const InitialRoute = (app) => {
  app.use("/api", Auth, [UserRouter, SessionRoute]);
  app.use("/api/otp", OtpAuth, [OtpRouter]);

  app.use("/app" /* [NO AUTH] */, [IndexRouter]);
};

module.exports = InitialRoute;

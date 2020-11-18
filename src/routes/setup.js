const IndexRouter = require("./index");
const UserRouter = require("./user.route");
const SessionRoute = require("./session.route");
const Auth = require("../middlewares/auth");

const InitialRoute = (app) => {
  app.use("/api", Auth, [UserRouter,SessionRoute]);
  app.use("/app" /* [NO AUTH] */, [IndexRouter]);
};

module.exports = InitialRoute;

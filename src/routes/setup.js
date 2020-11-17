const IndexRouter = require("./index");
const UserRouter = require("./user.route");
const Auth = require("../middlewares/auth");

const InitialRoute = (app) => {
  app.use("/api", Auth, [IndexRouter, UserRouter]);
  app.use("/app" /* [NO AUTH] */, [IndexRouter]);
};

module.exports = InitialRoute;

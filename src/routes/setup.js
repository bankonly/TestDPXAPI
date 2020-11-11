const IndexRouter = require("./index");

const InitialRoute = (app) => {
  app.use("/api" /* [TOKEN AUTH] */, [IndexRouter]);
  app.use("/app" /* [NO AUTH] */,[IndexRouter]);
};

module.exports = InitialRoute;

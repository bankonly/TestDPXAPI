const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const fileupload = require("express-fileupload");
const userAgent = require("express-useragent");
const morgan = require("morgan");

const InitialApp = (app) => {
  app.use(cors());

  // user agent
  app.use(userAgent.express());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // accept image from body from data
  app.use(fileupload());

  // Log all request
  app.use(morgan("dev"));
};

const OnEndInitialApp = (app) => {
  app.use("/", (req, res) => res.status(404).json({ data: {}, message: "api not found", status: false, code: 404 }));
};

module.exports.InitialApp = InitialApp;
module.exports.OnEndInitialApp = OnEndInitialApp;

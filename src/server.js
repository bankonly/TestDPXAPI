const app = require("express")();
const morgan = require("morgan");

const { InitSocket } = require("./configs/socket");
const { InitialApp, OnEndInitialApp } = require("./configs/app");
const { LOG } = require("./utils/common-func");
const { InitialDatabase } = require("./configs/database");
const InitialRoute = require("./routes/setup");

// Database
InitialDatabase();

// Config all middleware
InitialApp(app);

// inital all routes
InitialRoute(app);

//On end middleware
OnEndInitialApp(app);

const listener = app.listen(process.env.APP_PORT);

//config socket Io
InitSocket(listener);

LOG("Server Started " + process.env.APP_PORT);

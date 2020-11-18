const SessionController = require("../controllers/session.controller");

const http = require("express").Router();

http.get("/session/list", SessionController.list);
http.post("/session/clear", SessionController.clear);

const SessionRouter = http;
module.exports = SessionRouter;

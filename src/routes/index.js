const http = require("express").Router();

const IndexController = require("../controllers");

http.get("/welcome", IndexController.welcome);
http.get("/about-us", IndexController.aboutUs);

const IndexRouter = http;
module.exports = IndexRouter;

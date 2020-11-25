const http = require("express").Router();

const IndexController = require("../controllers");
const UserController = require("../controllers/user.controller");
const UserValidator = require("../validations/user.validation");

http.get("/welcome", IndexController.welcome);
http.get("/about-us", IndexController.aboutUs);

http.post("/send-otp-code", UserController.sendOtpCode);
http.post("/register", UserValidator.register, UserController.register);
http.post("/login", UserValidator.login, UserController.login);

const IndexRouter = http;
module.exports = IndexRouter;

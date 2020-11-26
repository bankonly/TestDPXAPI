const UserController = require("../controllers/user.controller");
const UserValidator = require("../validations/user.validation");

const http = require("express").Router();

http.get("/user/profile", UserController.profile);
http.post("/user/change-password", UserValidator.changePassword, UserController.changePassword);

const UserRouter = http;
module.exports = UserRouter;

const UserController = require("../controllers/user.controller");
const OtpValidator = require("../validations/otp");

const http = require("express").Router();

http.post("/verify-otp", UserController.verityOtp);
http.post("/reset-password", OtpValidator.resetPassword, UserController.resetPassword);

const OtpRouter = http;
module.exports = OtpRouter;

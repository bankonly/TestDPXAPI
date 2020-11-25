const Catcher = require("../middlewares/async");
const { Res, _, JwtGenerator, JwtGeneratorResetToken } = require("../utils/common-func");
const OtpModel = require("../models/opt.model");
const MailFunc = require("../func/mail.func");
const Jwt = require("jsonwebtoken");

const OtpController = {
  sendOtpCode: async ({ model, req, opts }) => {
    const body = req.body;
    if (!_.isEmail(body.email)) throw new Error(`400::email is required`);

    const user = await model.findOne({ email: body.email }).select("_id email");
    if (!user) throw new Error("400::email not found");

    const user_id = user._id.toString();

    const opt_new_code = _.generateOtp({});
    let otp_code = {
      otp_code: opt_new_code,
    };

    let save_data = {};
    save_data.code = opt_new_code;
    save_data.expire_time = _.date.addTime(process.env.OTP_EXPIRED_TIME);
    save_data.resend_after = _.date.addTime(process.env.OPT_ALLOW_RESENT_SECOND);
    save_data.author = user._id;

    let new_otp = null;

    const otp_data = await OtpModel.findOne({ author: user_id });
    if (!otp_data) {
      new_otp = await new OtpModel(save_data).save(opts);
    } else {
      const resend_time_sec = _.date.dateToSec(otp_data.resend_after);
      const now_sec = _.date.nowSec();
      const minus_in_sec = resend_time_sec - now_sec;

      if (now_sec < resend_time_sec) throw new Error(`400::${minus_in_sec}`);

      otp_data.resend_count = 0;
      otp_data.expire_time = save_data.expire_time;
      otp_data.resend_after = save_data.resend_after;
      otp_data.code = save_data.code;
      new_otp = await otp_data.save(opts);
    }

    if (!new_otp) throw new Error("otp save failed");

    const send = await MailFunc.send({
      to: user.email,
      otp_code: otp_code.otp_code,
      link: MailFunc.generateLink({
        host: process.env.APP_HOST,
        otp_code: otp_code.otp_code,
      }),
    });

    const payload = { _id: user._id };
    const token = JwtGeneratorResetToken(payload);

    return token;
  },
  verifyOtp: async ({ req, auth }) => {
    const body = req.body;
    if (_.isEmpty(body.otp_code)) throw new Error("400::otp_code is requried");

    const otp_data = await OtpModel.findOne({ author: auth._id });
    if (!otp_data) throw new Error(`400::user not found`);

    const expire_time_sec = _.date.dateToSec(otp_data.expire_time);
    const now_sec = _.date.nowSec();

    // check otp_code is expired or not
    if (expire_time_sec < now_sec) {
      otp_data.resend_count = 0;
      otp_data.allow_to_reset = false;
      await otp_data.save();
      throw new Error("400::code is expired");
    }

    if (otp_data.resend_count > process.env.OTP_ALLOW_SEND_TIME) throw new Error("400::otp code send limited ,please resend new otp code");

    if (otp_data.code !== body.otp_code) {
      otp_data.resend_count += 1;
      throw new Error("400::invalid otp_code");
    }

    otp_data.allow_to_reset = true;
    await otp_data.save();
  },
  resetPassword: async (model, { req }) => {
    const body = req.body;
    const auth = req.user;

    const otp_data = await OtpModel.findOne({
      author: auth._id,
      allow_to_reset: true,
    });
    if (!otp_data) throw new Error("400::_id not found");

    const user = await model.findById(auth._id);
    if (!user) throw new Error("400::user not found");

    user.password = await _.bcryptFn.hashPassword(body.password);
    if (!(await user.save())) throw new Error("failed to save new password");

    otp_data.allow_to_reset = false;
    await otp_data.save();
  },
};

module.exports = OtpController;

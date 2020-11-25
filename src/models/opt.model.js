const mongoose = require("mongoose");

const model_name = "otp";
const schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    expire_time: {
      type: Date,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    resend_count: {
      type: Number,
      default: 0,
    },
    resend_after: {
      type: Date,
      required: true,
    },
    allow_to_reset: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const OtpModel = mongoose.model(model_name, schema, model_name);

module.exports = OtpModel;
module.exports.model_name = model_name;

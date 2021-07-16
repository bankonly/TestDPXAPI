const { Schema, model } = require("mongoose")
const products_optionSchema = new Schema(
  {
    option_title: [],
    option_detail: [
      // {
      //   stock:{type:Number},
      //   price:{type:Number},
      // }
    ],
    created_date: {
      type: Date,
      default: Date.now(),
    },
    is_active: {
      type: String,
      enum: ["inactive", "active"],
      default: "active",
    },
  },
  {
    collection: "products_option",
  }
);

const products_option = model("products_option", products_optionSchema);

module.exports =  products_option;

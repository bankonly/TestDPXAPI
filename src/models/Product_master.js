const { Schema, model } = require("mongoose")

const ProductMaster = new Schema(
  {
    name: {
      type: String,
    },
    brand: {
      type: String,
    },
    desc: {
      type: String,
    },
    img: [],
    SKU: {
      type: String,
      // required: true
    },
    cat_id: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    created_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    is_active: {
      type: String,
      required: true,
      default: "active",
    },
    is_added_by: {
      type: String,
      required: true,
    },
  },
  {
    collection: "product_master",
  }
);

const ProductMasters = model("product_master", ProductMaster);
module.exports= ProductMasters;

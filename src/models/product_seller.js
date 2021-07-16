const { Schema, model } = require("mongoose");
const ProductSeller = new Schema(
  {
    product_master_id: {
      type: Schema.Types.ObjectId,
      ref: "product_master",
      default: null,
    },
    seller_id: {
      type: Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    product_option_id: {
      type: Schema.Types.ObjectId,
      ref: "products_option",
      required: false,
    },
    get_coins: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
    },
    price: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      default: null,
    },
    shipping_fee_for_seller: {
      type: Number,
      default: 0,
    },
    is_publish: {
      type: Boolean,
      default: true,
    },
    is_hidden: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: String,
      required: true,
      default: "active",
    },
    created_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "product_seller",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const ProductSellerModel = model("product_seller", ProductSeller, "product_seller");
module.exports =  ProductSellerModel;

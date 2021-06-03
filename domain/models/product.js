const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var sizeSchema = new Schema({
  size: String,
  quantity: Number,
})

var detail = new Schema({
  name: String,
  value: String,
})

var productSchema = new Schema({
  available: { type: Boolean, default: true },
  productName: String,
  description: String,
  price: Number,
  gender: String,
  brand: String,
  productCategory: String,
  category: String,
  imageurl: String,
  tickerSymbol: String,
  numberSold: Number,
  detail: [detail],
  sizeQuantity: [sizeSchema],
  tags: [String],
  releaseDate: Date,
  urlKey: String,
  dateUpdated: { type: Date, default: Date.now }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
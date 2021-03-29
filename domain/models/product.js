const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var sizeSchema = new Schema({
  size: String,
  quantity: Number
})

var productSchema = new Schema({
  productName: String,
  price: Number,
  gender: String,
  brand: String,
  productCategory: String,
  category: String,
  colorWay: String,
  imageurl: String,
  description: String,
  sizeQuantity: [sizeSchema],
  tags: [String],
  releaseDate: Date,
  dateUpdated: {type: Date, default: Date.now}
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
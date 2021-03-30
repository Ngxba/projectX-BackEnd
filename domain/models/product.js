const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var sizeSchema = new Schema({
  size: String,
  quantity: Number,
})

var productSchema = new Schema({
  available: Boolean,
  productName: String,
  brand: String,
  colorWay: String,
  description: String,
  releaseDate: Date,
  price: Number,
  sizeQuantity: [sizeSchema],
  tags: [String],
  dateUpdated: {type: Date, default: Date.now}
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

var sizeSchema = new Schema({
  size: String,
  quantity: Number
})

var productSchema = new Schema({
  productName: String,
  price: Number,
  category: String,
  colorWay: String,
  imageurl: String,
  sizeQuantity: [sizeSchema],
  tags: [String],
  dateUpdated: {type: Date, default: Date.now}
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
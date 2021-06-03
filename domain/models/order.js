const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;

const OrderSchema = new Schema({
    ownerId: String,
    productId: String,
    productName: String,
    urlKey: String, //Ex: air-jordan-5-retro-raging-bulls-red-2021-ps
    purchaseDate: Date,
    price: Number,
    status: String //Shipping, Received
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
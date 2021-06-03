var Order = require("../models/order.js");

const orderService = {
  getAllOrderOfOwner: async (ownerId) => {
    if (!(typeof ownerId === "string" || ownerId instanceof String)) {
      throw new Error("error/INVALID_ID");
    }
    let result = await Order.find({ ownerId }).exec();
    if (result) {
      return { orders: result };
    } else {
      throw new Error("error/ORDER_NOT_FOUND/WRONG_ID");
    }
  },
  getAllOrder: async () => {
    let result = await Order.find();
    if (result && result.length != 0) {
      return result;
    } else {
      throw new Error("error/CANNOT_GET_ALL/UNIDENTIFY_ERROR");
    }
  },
  createOrder: async (OrderOps) => {
    if (
      OrderOps["ownerId"] &&
      OrderOps["productId"] &&
      OrderOps["productName"]
    ) {
      const newOrder = Order(OrderOps);
      await newOrder.save();
      return newOrder;
    } else {
      throw new Error("error/ORDER_LACK_INFO");
    }
  },
};

module.exports = orderService;

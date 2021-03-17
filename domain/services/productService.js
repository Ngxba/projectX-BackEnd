var Product = require("../models/product");

const productService = {
  getProduct: async (productID) => {
    let result = await Product.findById(productID);
    if (result) {
      return result;
    } else {
      throw new Error("error/PRODUCT_NOT_FOUND/WRONG_ID");
    }
  },
  getAllProduct: async () => {
    let result = await Product.find();
    if (result && result.length != 0) {
      return result;
    } else {
      throw new Error("error/CANNOT_GET_ALL/UNIDENTIFY_ERROR");
    }
  },
  createProduct: async (ProductOps) => {
    if (ProductOps["productName"] && ProductOps["price"] && ProductOps["sizeQuantity"]) {
      const result = await Product.findOne({ productName: ProductOps["productName"] });
      if (!result) {
        const newProduct = Product(ProductOps);
        await newProduct.save();
        return newProduct;
      } else {
        throw new Error("error/PRODUCT_ALREADY_CREATED");
      }
    } else {
      throw new Error("error/PRODUCT_LACK_INFO");
    }
  },
  updateProduct: async (_id, updateOps) => {
    updateOps["dateUpdated"] = Date.now();
    // const {sizeQuantity, tags, ...otherOps} = updateOps;
    // console.log("Quantiti", sizeQuantity,"Tags", tags,"Other", otherOps)
    // updateOps["dateUpdated"] = Date.now();
    // const {sizeQuantity, tags, ...otherOps} = updateOps;
    // let product = await Product.findById(_id);
    // for (i in sizeQuantity){
    //   product.sizeQuantity.push(sizeQuantity[i])
    // }
    // for (i in tags){
    //   product.tags.push(tags[i])
    // }
    // await product.updateOne(otherOps);
    // let result = await product.save()
    // console.log(result)
    // if (result) {
    //   return result;
    // } else {
    //   throw new Error("error/PRODUCT_NOT_FOUND/WRONG_ID");
    // }
    let result = await Product.updateOne({ _id }, { $set: updateOps });
    if (result) {
      return result;
    } else {
      throw new Error("error/PRODUCT_NOT_FOUND/WRONG_ID");
    }
  },
  
  deleteProduct: async (_id) => {
    let result = await Product.findOneAndRemove({ _id });
    if (result) {
      return result;
    } else {
      throw new Error("error/PRODUCT_NOT_FOUND/WRONG_ID");
    }
  },
};

module.exports = productService;

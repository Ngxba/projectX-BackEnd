var express = require("express");
const fs = require('fs');
var productService = require("../../domain/services/productService");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await productService.getAllProduct();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

router.get("/browse", async (req, res) => {
  // tags=rolex,day-date,style|pilot
  // tags=nike&productCategory=sneakers&size=5&gender=men&year=2020&price=<100,150-200,>800&offset=0&limit=10&sort=most-popular
  const { productCategory, gender, size, price, tags, year, sort, limit, offset, admin } = req.query;
  try {
    const result = await productService.getFilteredProduct({ productCategory, gender, size, price, tags, year, sort }, offset, limit, admin);
    res.status(200).json(result);
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: err.message,
    });
  }
});

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

router.get("/recent", async (req, res) => {

  try {
    let ogJson = { "result": [] }
    fs.readFile("application/router/view.json", "utf8", async (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        return;
      }
      try {
        ogJson = JSON.parse(jsonString);
        if (ogJson.result.length < 4) {
          let offset = undefined;
          let limit = 4;
          admin = false;
          ogJson = await productService.getFilteredProduct({ "productCategory": undefined, "gender": undefined, "size": undefined, "price": undefined, "tags": undefined, "year": undefined, "sort": undefined }, offset, limit, admin);
        }
        ogJson.result = getRandom(ogJson.result, 4)
        res.status(200).json(ogJson);
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      err: err.message,
    });
  }
});

router.get("/:urlKey", async (req, res) => {
  const { urlKey } = req.params;
  let ogJson = { "result": [] }
  fs.readFile("application/router/view.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      ogJson = JSON.parse(jsonString);
      // console.log("Customer address is:", customer.address); // => "Customer address is: Infinity Loop Drive"
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });

  try {
    const result = await productService.getProduct(urlKey);
    let itemExist = 0
    ogJson.result.map((item) => {
      if (item._id == result.product._id) {
        itemExist = 1
      }
      return null
    })
    if (!itemExist) {
      console.log("LENGTH" + ogJson.result.length)
      if (ogJson.result.length >= 10) {
        ogJson.result.shift();
      }
      ogJson.result = [...ogJson.result, result.product]
      const jsonString = JSON.stringify(ogJson)
      fs.writeFile('application/router/view.json', jsonString, err => {
        if (err) {
          console.log('Error writing file', err)
        } else {
          console.log('Successfully wrote file')
        }
      })
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});


router.post("/createProduct", async (req, res) => {
  const productOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    productOps[key] = value;
  }
  try {
    const newProduct = await productService.createProduct(productOps);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

router.post("/update/:productId", async (req, res) => {
  const { productId } = req.params;
  const updateOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  try {
    const updatedProduct = await productService.updateProduct(productId, updateOps);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

router.delete("/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await productService.deleteProduct(productId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

module.exports = router;

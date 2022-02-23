const express = require("express");
const userService = require("../../domain/services/userService");
const auth = require("../../config/auth");
const Product = require("../../domain/models/product");
const router = express.Router();

router.get("/", async (req, res) =>
{
    const {offset, limit} = req.query;
    try
    {
        const result = await userService.getAllUser(offset, limit);
        res.status(200).json(result);
    }
    catch (err)
    {
        res.status(500).json({
            err: err.message
        });
    }
});

router.post("/createUser", auth.require, async (req, res) =>
{
    const userOps = {};
    for (const [key, value] of Object.entries(req.body))
    {
        userOps[key] = value;
    }
    try
    {
        const newUser = await userService.createUser(userOps);
        res.status(200).json(newUser);
    }
    catch (err)
    {
        res.status(400);
        res.json({
            err: err.message
        });
    }
});

router.post("/update/:userId", auth.require, async (req, res) =>
{
    const {userId} = req.params;
    const updateOps = {};
    for (const [key, value] of Object.entries(req.body))
    {
        updateOps[key] = value;
    }
    try
    {
        const updatedUser = await userService.updateUser(userId, updateOps);
        res.status(200).json(updatedUser);
    }
    catch (err)
    {
        res.status(400);
        res.json({
            err: err.message
        });
    }
});

router.post("/update/likedProduct/:userId", async (req, res) =>
{
    const {userId} = req.params;
    let {likedProduct} = req.body;
    try
    {
        const updatedUser = await userService.updateLikedProduct(userId, likedProduct);
        const newData = await userService.getUser(userId);
        res.status(200).json(newData);
    }
    catch (err)
    {
        res.status(400);
        res.json({
            err: err.message
        });
    }
});

const numberOfSameElement = (array_1, array_2) =>
{
    let count = 0;
    for (const e_1 of array_1)
    {
        for (const e_2 of array_2)
        {
            if (e_1 === e_2)
            {
                count++;
                break;
            }
        }
    }
    return count;
};

router.get("/bestFit/:userId", async (req, res) =>
{
    const {userId} = req.params;
    let bestFitProductsId = [];
    let bestFitProducts = [];

    try
    {
        const allUsers = await userService.getAllUser();

        // Get all other user liked products
        const comparedData = [];
        for (const user of allUsers.result)
        {
            comparedData.push(user.likedProduct);
        }

        const currentUser = await userService.getUser(userId);
        const currentUserLikedProductId = currentUser.likedProduct;

        let previousCount = 0;
        for (const currentList of comparedData)
        {
            const sameProductCount = numberOfSameElement(currentUserLikedProductId, currentList);

            console.log(sameProductCount);

            console.log(sameProductCount !== currentUserLikedProductId.length);
            // To skip compare with current user liked products
            if ((sameProductCount !== currentUserLikedProductId.length || currentUserLikedProductId.length === 0)
                && sameProductCount >= previousCount)
            {
                // Filter out product id that is already in user liked list
                const validProductIds = currentList.filter(id => !currentUserLikedProductId.includes(id));

                console.log(validProductIds);

                bestFitProductsId.push(...validProductIds);

                if (bestFitProductsId.length >= 4)
                {
                    previousCount = sameProductCount;
                }
            }
        }

        // Select 4 last product id
        bestFitProductsId = bestFitProductsId.slice(-4);

        // Get product by id
        for (const id of bestFitProductsId)
        {
            const product = await Product.findOne({_id: id});
            bestFitProducts.push(product);
        }

        res.status(200).json(bestFitProducts);
    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({
            err: err.message
        });
    }
});

router.delete("/delete/:userId", auth.require, async (req, res) =>
{
    const {userId} = req.params;
    try
    {
        const result = await userService.deleteUser(userId);
        res.status(200).json(result);
    }
    catch (err)
    {
        res.status(500).json({
            err: err.message
        });
    }
});

router.get("/:userId", auth.require, async (req, res) =>
{
    const {userId} = req.params;
    try
    {
        const result = await userService.getUser(userId);
        res.status(200).json(result);
    }
    catch (err)
    {
        res.status(500).json({
            err: err.message
        });
    }
});

router.get("/test");

module.exports = router;

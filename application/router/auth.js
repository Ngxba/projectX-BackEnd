const express = require("express");
const passport = require("passport");
const authService = require("../../domain/services/authService");
const userService = require("../../domain/services/userService");
const auth = require("../../config/auth");
const router = express.Router();

//Setting up cookies


router.post("/register", auth.optional, async (req, res) =>
{
    const {name, email, password} = req.body;
    try
    {
        const newUser = await authService.signUp(name, email, password);
        res.json({
            email: newUser.email,
            name: newUser.name,
            address: newUser.address
        });
    }
    catch (err)
    {
        res.status(400).json({
            error: err.message
        });
    }
});

router.post("/login", auth.optional, async (req, res, next) =>
{
    const {email, password} = req.body;
    if (!email || !password)
    {
        return res.json({
            "err": "err/LACK_INFO"
        });
    }
    passport.authenticate("local", {session: false}, (err, user, next) =>
    {
        if (err)
        {
            return next(err);
        }
        if (user)
        {
            return res
                .cookie("jwt", user.generateJWT(), {
                    path: "/",
                    maxAge: 2 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: true
                })
                .json({
                    email: user.email,
                    name: user.name
                });
        } else
        {
            return res.status(203).json({
                error: "LOGIN_FALSE/WRONG_INFO"
            });
        }
    })(req, res, next);
});

router.get("/me", auth.require, async (req, res) =>
{
    const {payload} = req;
    try
    {
        if (!req.cookies.jwt)
        {
            res.status(500).json({
                err: "Token expired"
            });
        }

        const result = await userService.getUser(payload._id);

        // const {email,address,name}
        res.status(200).json({
            id: payload._id,
            email: result.email,
            name: result.name,
            address: result.address
        });
    }
    catch (err)
    {
        res.status(500).json({
            err: err.message
        });
    }
});

router.get("/logout", auth.optional, async (req, res) =>
{
    try
    {
        res.clearCookie('jwt', { path: '/' });
    }
    catch (err)
    {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router;

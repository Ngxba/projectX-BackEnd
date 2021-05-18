var express = require("express");
var passport = require("passport");
var authService = require("../../domain/services/authService");
var userService = require("../../domain/services/userService");
var auth = require("../../config/auth");
var router = express.Router();

router.post("/register", auth.optional, async (req, res) =>
{
    const {name, email, password} = req.body;
    try
    {
        const newUser = await authService.signUp(name, email, password);
        res.json({
            token: newUser.generateJWT(),
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
            return res.json({
                email: user.email,
                name: user.name,
                id: user._id,
                // address: user.address,
                token: user.generateJWT()
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
        const result = await userService.getUser(payload._id);
        res.status(200).json({
            id: payload._id,
            name: result.name,
            email: result.email,
            token: result.generateJWT()
        });
    }
    catch (err)
    {
        res.status(500).json({
            err: err.message
        });
    }
});

module.exports = router;

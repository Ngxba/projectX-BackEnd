var express = require("express");
var passport = require("passport")
var authService = require("../../domain/services/authService");
var userService = require("../../domain/services/userService");
var auth = require("../../config/auth")
var router = express.Router();

router.post("/register", auth.optional, async (req, res) => {
  const { name, address, email, password } = req.body;
  try {
    const newUser = await authService.signUp(name, address, email, password);
    res.json({
        token: newUser.generateJWT()
    });
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

router.post("/login", auth.optional, async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.json({
            "err": "err/LACK_INFO"
        })
    }
    passport.authenticate("local", {session: false}, (err, user, next) => {
        if(err){
            return next(err)
        } 
        if(user) {
            return res.json({
                email: user.email,
                name: user.name,
                address: user.address,
                token: user.generateJWT()
            })
        }
    })(req, res, next)
});

router.get("/me", auth.require, async (req, res) => {
    // Bên front-end cần phải gửi token trong header thì mới load được nhé
    // axios.get(link to back-end, {headers: {Authorization: Token lấy từ local storage hay đâu đó}})
    // rồi set axios.defaults.common["Authorization"] = "Bearer + Token" => việc này sẽ khiến tất cả axios khác đều có header như thế, nên set sau khi login xong
    const { payload } = req;
    try {
      const result = await userService.getUser(payload._id);
      res.status(200).json(result); 
      // chú ý, đang gửi cả DB về, custom để gửi thông tin cần thiết thôi nhé
    } catch (err) {
      res.status(500).json({
        err: err.message,
      });
    }
  });

module.exports = router;
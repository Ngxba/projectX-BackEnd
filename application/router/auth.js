var express = require("express");
var passport = require("passport")
var authService = require("../../domain/services/authService");
var userService = require("../../domain/services/userService");
var auth = require("../../config/auth")
var router = express.Router();

router.post("/register", auth.optional, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await authService.signUp(name, email, password);
    res.json({
        token: newUser.generateJWT(),
        email: newUser.email,
        name: newUser.name,
        address: newUser.address,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
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
            return next(err);
        } 
        if(user) {
            return res.json({
                id: user._id,
                email: user.email,
                name: user.name,
                // address: user.address,
                token: user.generateJWT()
            })
        }else {
          return res.status(203).json({
            error: "LOGIN_FALSE/WRONG_INFO"
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
      if (payload.expirationDate < new Date().getTime()) {
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
        address: result.address,
        token: result.generateJWT(),
      }); 
      // chú ý, đang gửi cả DB về, custom để gửi thông tin cần thiết thôi nhé
    } catch (err) {
      res.status(500).json({
        err: err.message,
      });
    }
  });

module.exports = router;
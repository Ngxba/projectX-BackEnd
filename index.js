require("dotenv").config()
var express = require("express");
var cors = require("cors");
var router = require("./application/router/index.js") // mac dinh no se tro? toi index.js
var morgan = require("morgan")
var bodyParser = require("body-parser");

// const expressSession = require('express-session')({
//     secret: process.env.JWT_KEY,
//     resave: false,
//     saveUninitialized: false
//   });

const app = express();

/*  PASSPORT SETUP  */

// const passport = require('passport');

// app.use(passport.initialize());
// app.use(passport.session());

require("./config/passport")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true})) 
app.use(morgan("dev"))
app.use(cors());
// app.use(expressSession)


app.use("/api",router);
app.get("/" , (req,res)=>{
    res.json({
        hello : "world"
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{ console.log(`Running on port ${PORT}`)
})
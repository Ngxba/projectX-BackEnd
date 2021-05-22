require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./application/router");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const app = express();

require("./config/passport");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.use("/api", router);
app.get("/", (req, res) =>
{
    res.json({
        hello: "world"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
{
    console.log(`Running on port ${PORT}`);
});

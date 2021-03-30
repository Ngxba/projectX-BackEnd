require("dotenv").config();
var mongoose = require("mongoose");


const db = {
    url : `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_KEY}${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    option : {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }
}

mongoose.connect(db.url, db.option);

module.exports = mongoose;
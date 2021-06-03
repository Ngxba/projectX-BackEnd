const mongoose = require("../../infrastructure/db");
var Schema = mongoose.Schema;
const crypto = require("crypto")
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  email: String,
  name: {
    firstName: String,
    lastName: String
  },
  address: String,
  sex: String,
  phoneNumber: String,
  dateUpdated: {type: Date, default: Date.now},
  role: String,
  hash: String,
  salt: String
})

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
}

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash == hash
}


UserSchema.methods.generateJWT = function() {
  const now = new Date().getTime();
  const expirationDate = now + 15*24*60*60*1000
  // const dateExp = (expirationDate.getTime() / 1000, 10);
  // const returnDate = new Date(1000*dateExp);
  // console.log(returnDate.getDate())
  return jwt.sign({
    _id: this._id,
    exp: expirationDate
  }, process.env.JWT_SECRET);
}
const User = mongoose.model("User", UserSchema);

module.exports = User;
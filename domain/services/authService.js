var User = require("../models/user");

const authService = {
  signUp: async (name, email, password) => {
    let result = await User.findOne({ email: email });
    if (!result) {
      const newUser = User({
        email,
        name,
      });
      newUser.setPassword(password);
      result = await newUser.save();
      return result;
    } else {
      throw new Error("USER_EXISTED");
    }
  },
  signIn: async (email, password) => {
    let result = await User.find({ email, password });
    if (result) {
      return result;
    } else {
      throw new Error("error/USER_NOT_FOUND/WRONG_EMAIL_PASS");
    }
  },
};

module.exports = authService;

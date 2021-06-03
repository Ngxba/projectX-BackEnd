var User = require("../models/user");

const userService = {
  updateUser: async (_id, updateOps) => {
    updateOps["dateUpdated"] = Date.now();
    let result = await User.updateOne({ _id }, { $set: updateOps });
    if (result) {
      return result;
    } else {
      throw new Error("error/USER_NOT_FOUND/WRONG_EMAIL_PASS");
    }
  },
  getUser: async (_id) => {
    console.log(_id)
    let result = await User.findById(_id);
    if (result) {
      return result;
    } else {
      throw new Error("error/USER_NOT_FOUND/WRONG_ID");
    }
  },
  deleteUser: async (_id) => {
    let result = await User.findOneAndRemove({ _id });
    if (result) {
      return result;
    } else {
      throw new Error("error/USER_NOT_FOUND/WRONG_ID");
    }
  },
  createUser: async (userOps) => {
    if (userOps["email"]) {
      const result = await User.findOne({ email: userOps["email"] });
      if (!result) {
        const newUser = User(userOps);
        newUser.setPassword(userOps["password"]);
        await newUser.save();
        return newUser;
      } else {
        throw new Error("error/USER_ALREADY_CREATED/EMAIL_EXISTED");
      }
    } else {
      throw new Error("error/USER_LACK_INFO");
    }
  },
  getAllUser: async (offset, limit) => {
    let result;
    if (offset != undefined && limit != undefined) result = await User.find().limit(parseInt(limit)).skip(parseInt(limit) * parseInt(offset));
    else result = await User.find();
    const totalRecord = await User.find().count();
    if (result && result.length != 0) {
      return { result, totalRecord };
    } else {
      throw new Error("error/CANNOT_GET_ALL/UNIDENTIFY_ERROR");
    }
  }
};

module.exports = userService;

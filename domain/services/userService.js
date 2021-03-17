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
  getAllUser: async() => {
      let result = await User.find()
      if(result && result.length != 0) {
          return result
      } else {
        throw new Error("error/CANNOT_GET_ALL/UNIDENTIFY_ERROR");
      }
  }
};

module.exports = userService;

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  gender: String,
  dob: {
    type: Date,
  },

  email: {
    type: String,
    trim: true,
    required: true,
    index: {
      unique: true,
    },
  },
  userImage: {
    type: String,
    default:
      "https://res.cloudinary.com/raviteja-cloud/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1643874160/ProfileImages/man_hfkdqe.png",
  },

  password: {
    type: String,
    required: true,
  },

  mobile: {
    type: Number,
  },
  role: String,
  membership: {
    type: String,
    default: "silver",
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET
    );
    console.log(token);
    this.tokens = this.tokens.concat({
      token: token,
    });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;

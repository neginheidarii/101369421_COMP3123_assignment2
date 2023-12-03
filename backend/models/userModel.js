const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseBcrypt = require("mongoose-bcrypt");


const userSchema = new Schema({
  // primary key
  username: {
    type: String,
    require: true,
    maxlength: 100,
    unique: true,
  },
  // unique
  email: {
    type: String,
    require: true,
    unique: true,
    maxlength: 50,
  },
  // encrypted
  password: {
    type: String,
    require: true,
    maxlength: 50,
  },
});

// encrypt password
userSchema.plugin(mongooseBcrypt);


// ?
// userSchema.index({ username: 1 }, { unique: true });
module.exports = mongoose.model("User", userSchema);

const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {type: String, required: true},
    name: {type: String, required: false},
  });
  const User = mongoose.model('User', userSchema);
  module.exports = User;
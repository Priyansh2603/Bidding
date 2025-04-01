const { default: mongoose } = require("mongoose");

const FormSchema = new mongoose.Schema({
    applyingFor: String,
    name: String,
    companyName: String,
    mobile: String,
    email: String,
    businessCategory: String,
    gstStatus: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
  });
  const Form = mongoose.model('Form', FormSchema);
  module.exports = Form;
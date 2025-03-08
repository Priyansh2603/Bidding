const { default: mongoose } = require("mongoose");

const FormSchema = new mongoose.Schema({
    applyingFor: String,
    name: String,
    companyName: String,
    mobile: String,
    email: String,
    businessCategory: String,
    gstStatus: String,
  });
  const Form = mongoose.model('Form', FormSchema);
  module.exports = Form;
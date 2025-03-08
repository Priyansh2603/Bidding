
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const FormSchema = new mongoose.Schema({
  applyingFor: String,
  name: String,
  companyName: String,
  mobile: String,
  email: String,
  businessCategory: String,
  gstStatus: String,
});
const FormModel = mongoose.model('Form', FormSchema);

app.post('/api/form', async (req, res) => {
  try {
    const formData = new FormModel(req.body);
    await formData.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting form' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));

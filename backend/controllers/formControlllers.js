const Form = require("../models/Form");

exports.addBidd = async (req, res) => {
    try {
      const formData = new Form({...req.body, user:req.user.id});
      await formData.save();
      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting form' });
    }
  }
exports.getAllBids = async (req, res) => {
    try {
      const formData = await Form.find();
      res.status(201).json({ message: 'Data Fetched successfully', formData });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting form' });
    }
  }
exports.getBid = async (req, res) => {
    try {
      const formData = await Form.findOne({user:req.user.id});
      res.status(201).json({ message: 'Data Fetched successfully', formData });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting form' });
    }
  }
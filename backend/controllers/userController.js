const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.verifyOtp = async (req, res) => {
    try {
        const { phone } = req.body;

        // Find or create user
        let user = await User.findOne({ phone });
        if (!user) {
            user = new User({ phone });
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '31d' });

        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.check = async (req, res) => {
    console.log(req.user)
    try {
        const id = req.user.id;

        // Find or create user
        let user = await User.findOne({_id: req.user.id });
        if(!req.user.id){
            user = await User.findById({ _id: req.user.userId });
        }
        if (!user) {
            return res.status(200).json({success:false});
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

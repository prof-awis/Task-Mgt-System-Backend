const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');
const { JWT_SECRET } = require('../config/env');

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);


    const user = new User({
      email,
      password:passwordHash,
      firstName, 
      lastName
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        user.password = undefined ;
        res.status(200).json({ token, user });
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
      }
};


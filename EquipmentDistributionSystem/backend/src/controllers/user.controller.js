const User  = require('../models/user.model')
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = (req,res) => {
    const userData  = req.body;

    User.create(userData,(err, user) => {
      if(err) {
        return res.status(500).json({error: err})
      }
      return res.status(201).json({user})  
    })
}

const searchUser = (req, res) => {
    const userData = req.body;
  
    User.getUser(userData, (err, users) => {
      if (err) {
        console.error('Error retrieving user:', err);
        return res.status(500).json({ error: err });
      }
  
      if (users.length === 0) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      const user = users[0];
      const { email, password } = user;
  
      // Compare passwords
      bcrypt.compare(userData.password, password, (compareErr, isMatch) => {
        if (compareErr) {
          console.error('Error comparing passwords:', compareErr);
          return res.status(500).json({ error: compareErr });
        }
  
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
  
        // Passwords match, generate token
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        const payload = {
            user: user,
            token: token
        }

        return res.status(200).json({ payload })

      });
    });
  };
  
module.exports = {createUser,searchUser};
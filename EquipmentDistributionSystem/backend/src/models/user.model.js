const connection = require('../config/db')
const bcrypt = require('bcrypt')
const Joi = require('joi')

// const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required()
// });

class User {
    static getUser(userData, callback) {
        const email = userData.email;
        const query = `SELECT * FROM users where email = '${email}'`;
        connection.query(query, (err, result) => {
            if (err) {
                console.error('Error retrieving user:', err);
                return callback(err, null);
            }
            callback(null, result);
        });
    }

    static create(data, callback) {
        // const { error, value } = schema.validate(data);
        // if (error) {
        //     console.error('Validation error:', error);
        //     return callback(error, null);
        // }

        const { email, password } = data;

        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error('Error hashing password:', hashErr);
                return callback(hashErr, null);
            }

            const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
            connection.query(query, [email, hashedPassword], (insertErr, result) => {
                if (insertErr) {
                    console.error('Error creating user:', insertErr);
                    return callback(insertErr, null);
                }
                callback(null, result.insertId);
            });
        });
    }

}

module.exports = User;
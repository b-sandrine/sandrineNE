const connection = require('../config/db')
const Joi = require('joi')
const schema = Joi.object({
    fullnames: Joi.string().min(5).max(50).required(),
    NID: Joi.number().integer().min(1190000000000000).max(1200700000000000).required(),
    telephone: Joi.string().required(),
    email: Joi.string().email().required(),
    dapartment: Joi.string().required(),
    position: Joi.string().required(),
    manufacturer: Joi.string().required(),
    model: Joi.string().required(),
    serialNumber: Joi.number().integer().required(),
});

class Employee {
    static getAll(callback) {
        const query = 'SELECT * FROM employees';
        connection.query(query, (err, rows) => {
            if (err) {
                console.error('Error retrieving employees:', err);
                return callback(err, null);
            }
            callback(null, rows);
        });
    }

    static create(employeeData, callback) {
        const { error, value } = schema.validate(employeeData);
        if (error) {
            console.error('Validation error:', error);
            return callback(error.details[0].message, null);
        }
        const {fullnames, NID, telephone, email, department, position, manufacturer, model, serialNumber} = value;
        const employee = {
            fullnames,
            NID,
            telephone,
            email,
            department,
            position,
            manufacturer,
            model,
            serialNumber
        }
        const query = 'INSERT INTO employees SET ?';
        connection.query(query, employee , (err, result) => {
          if (err) {
            console.error('Error creating employee:', err);
            return callback(err, null);
          }
          callback(null, result.insertId);
        });
      }
}

module.exports = Employee;
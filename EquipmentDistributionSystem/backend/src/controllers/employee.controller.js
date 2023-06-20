
const Employee = require('../models/employee.model')

const getAllEmployees = async(req,res) => {
    await Employee.getAll((err,employees) => {
        if(err) {
            return res.status(500).json({error: error})
        }
        return res.status(200).json({
            employees
        })
    })
}

const createEmployee = (req,res) => {
    const employeeData = req.body;
    console.log(employeeData);
    Employee.create(employeeData,(err, user) => {
        if(err) {
          return res.status(500).json({error: err})
        }
        return res.status(201).json({user})  
      })
}

module.exports = {getAllEmployees,createEmployee}
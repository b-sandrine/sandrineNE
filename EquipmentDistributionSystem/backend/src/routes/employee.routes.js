const express = require('express');
const router = express.Router();
const {getAllEmployees, createEmployee} = require('../controllers/employee.controller');
const verifyToken = require('../auth/authMiddleware')

/**
 * @swagger
 * /api/employees/create:
 *   post:
 *     summary: Register Employee
 *     description: Creating a new employee
 *     responses:
 *       '201':
 *         description: Employee Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 * /api/employees/list:
 *   get:
 *     summary: Get all registered employees
 *     description: List of employees who are registered
 *     responses:
 *       '200':
 *         description: List Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.get('/list',verifyToken, getAllEmployees);
router.post('/create',verifyToken, createEmployee);

module.exports = router;

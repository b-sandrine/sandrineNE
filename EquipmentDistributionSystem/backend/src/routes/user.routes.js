const express = require('express')
const {createUser, searchUser}  = require('../controllers/user.controller')
const router = express.Router();

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create User
 *     description: Creating a new user account
 *     responses:
 *       '201':
 *         description: User Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /api/users/login:
 *   post:
 *     summary: Sign in User Account
 *     description: Accessing an existing user account
 *     responses:
 *       '200':
 *         description: User Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/create', createUser);
router.post('/login', searchUser)

module.exports = router;
// routes/purchasedTokens.js
const express = require('express');
const router = express.Router();
const {generateToken, validateToken, getTokensByMeterNumber} = require('../controllers/purchasedTokens.controller')

/**
 * @swagger
 * /api/tokens/create:
 *   post:
 *     summary: Create Token
 *     description: Creating a new token
 *     responses:
 *       '201':
 *         description: Token Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 * /api/tokens/list:
 *   get:
 *     summary: Get all tokens
 *     description: List of tokens who are registered
 *     responses:
 *       '200':
 *         description: List Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 */

// Generate a new token
router.post('/generateToken', generateToken)

// Validate a token
router.post('/validateToken', validateToken);

// Get all tokens for a meter number
router.get('/tokensByMeterNumber/:meterNumber', getTokensByMeterNumber);

module.exports = router;

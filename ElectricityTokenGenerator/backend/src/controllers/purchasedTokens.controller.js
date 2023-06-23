const PurchasedToken = require('../models/purchasedToken.model')


const generateUserToken = (tokenValueDays) => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    const token = `${randomNumber}${tokenValueDays}`.slice(0, 8);
    return token;
};


const generateToken = async (req, res) => {
    try {
        const { amount, meterNumber } = req.body;

        if (amount % 100 !== 0) {
            res.status(400).json({ error: 'Amount should be a multiple of 100' });
            return;
        }

        const tokenValueDays = Math.floor(amount / 100);

        const token = generateUserToken(tokenValueDays);

        // Create a new token
        const newToken = new PurchasedToken({
            amount,
            meterNumber,
            token: token, // Implement the token generation logic
            tokenValueDays,
        });

        console.log(newToken);

        // Save the token to the database
        const savedToken = await newToken.save();

        res.status(200).json(savedToken);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const validateToken = async (req, res) => {
    try {
        const { token } = req.body;

        console.log(token)
        // Find the token in the database
        const foundToken = await PurchasedToken.findOne({ token:token });

        console.log(foundToken)
        if (!foundToken) {
            res.status(404).json({ error: 'Token not found' });
            return;
        }

        res.status(200).json({ tokenValueDays: foundToken.tokenValueDays });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getTokensByMeterNumber = async (req, res) => {
    try {
        const { meterNumber } = req.params;
        console.log(meterNumber)

        // Find all tokens for the given meter number
        const tokens = await PurchasedToken.find({ meterNumber });
        if(tokens) {
            return res.status(200).json(tokens);
        }
        return res.status(400).json({error: "Failed"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { generateToken, validateToken, getTokensByMeterNumber }
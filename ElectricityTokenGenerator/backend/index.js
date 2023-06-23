const express = require('express');
const cors = require('cors');
const app = express();

// Connect to MongoDB
require('./src/config/db');

// Parse incoming JSON data
app.use(express.json());
app.use(cors());

const swagger = require('./swagger')

swagger(app);

const purchasedTokenRoutes = require('./src/routes/purchasedToken.route');

// Routes
app.use('/api/purchasedTokens', purchasedTokenRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

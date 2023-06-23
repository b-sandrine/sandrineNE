const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/purchase_tokens', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
if (connection) {
    console.log('Connected to MongoDB')
}
else {
    console.error('MongoDB connection error:', error)
}

module.exports = connection;
const express = require('express')
require('dotenv').config()
const json = express.json();
const cors = require('cors')

const PORT = process.env.PORT || 2000
const app = express();

app.use(json)
app.use(cors())

require('./src/config/db')
const employeeRoutes = require('./src/routes/employee.routes')
const userRoutes = require('./src/routes/user.routes')

const swagger = require('./swagger')

swagger(app);

app.get('/',(req,res) => {
    res.send('Welcome to backend tutorial')
})

app.use('/api/users',userRoutes)
app.use('/api/employees', employeeRoutes)

app.listen(PORT, function() {
    console.log(`app running on http://localhost:${PORT}`);
})
require('dotenv').config()
require('express-async-errors');

// Security imports
const helmet = require('helmet')
const cors = require('cors')

// Logging
const morgan = require("morgan")

// Express imports
const express = require('express')
app = express()

// Database connection
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication');

// Express.json for access to req.body
app.use(express.json());
app.use(morgan('dev'))

// router imports
const authRouter = require('./routes/authRouter')
const pantryRouter = require('./routes/pantryRouter')
const searchRouter = require('./routes/searchRouter')

// error handling middleware imports
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Security
app.use(helmet())
app.use(cors())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/pantry', authenticateUser, pantryRouter)
app.use('/api/v1/search', searchRouter)



app.get('/', (req, res) => {
    res.send('<h1>SimplKitchenAPI</h1>')
})

//error handling middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
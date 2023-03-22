require('dotenv').config()
require('express-async-errors');

// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

// Security imports
const helmet = require('helmet')
const cors = require('cors')

// Logging
const morgan = require("morgan")

// Express imports
const express = require('express')
app = express()

// Database connection
const connectDB = require('./connections/connectDatabase')
const authenticateUser = require('./middleware/authentication');

// Spoonacular connection
const connectSpoonacularApi = require('./connections/connectSpoonacular')

// Express.json for access to req.body
app.use(express.json());
app.use(morgan('dev'))

// router imports
const authRouter = require('./routes/authRouter')
const pantryRouter = require('./routes/pantryRouter')
const userRouter = require('./routes/userRouter')
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
app.use('/api/v1/user/', authenticateUser, userRouter)
app.use('/api/v1/search', authenticateUser, searchRouter)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.get('/', (req, res) => {
    res.send('<h1>SimplKitchenAPI</h1><a href="/api-docs">Documentation</a>')
})

//error handling middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // Connect to Mongo with Mongo URI
        await connectDB(process.env.MONGO_URI)
        //await connectSpoonacularApi(process.env.SPOONACULAR_API_KEY)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
require('dotenv').config()
require('express-async-errors');
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
app = express()
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication');

app.use(express.json());
// router imports
const authRouter = require('./routes/authRouter')
const ingredientRouter = require('./routes/ingredientsRouter')
const pantryRouter = require('./routes/pantryRouter')

// error handling middleware imports
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(helmet())
app.use(cors())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1', ingredientRouter)
app.use('/api/v1/pantry', authenticateUser, pantryRouter)
//app.use('/api/v1/pantry', pantryRouter)

//error handling middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware)

// Database

app.get('/', (req, res) => {
    res.send('<h1>SimplKitchenAPI</h1>')
})

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
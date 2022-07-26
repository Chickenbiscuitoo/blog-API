const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

const apiErrorHandler = require('./error/api-error-handler')

// Routers Require
const indexRouter = require('./routes/indexRouter')
const apiRouter = require('./routes/apiRouter')

const app = express()

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI
mongoose.connect(
	mongoDB,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log('MongoDB Connected')
)
const db = mongoose.connection
db.on(
	'error',
	console.error.bind(console, 'MongoDB connection error:')
)

// CORS Middleware
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET'],
	})
)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', indexRouter)
app.use('/api', apiRouter)

app.use(apiErrorHandler)

// // Catch 404 and forward to Error Handler
// app.use(function (req, res, next) {
// 	next(createError(404))
// })

// // Error Handler
// app.use(function (err, req, res, next) {
// 	// Set locals, only providing error in development
// 	res.locals.message = err.message
// 	res.locals.error = req.app.get('env') === 'development' ? err : {}

// 	// Render the error page
// 	res.status(err.status || 500).json({
// 		err: err.message,
// 	})
// })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

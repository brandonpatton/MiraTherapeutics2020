const express = require('express')
const app = express()
const configRoutes = require('./routes')
const mongoose = require('mongoose')
var cors = require("cors")


app.use(express.json());
app.use(cors());

configRoutes(app)

app.listen(3080, async () => {
	if (process.env.NODE_ENV === 'prod') {
		// This will be when NODE_ENV is prod. Needs AWS DB
		await mongoose.connect('mongodb://mongodb:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
			if (err) console.error(err);
		})
	} else {
		// This is dev
		await mongoose.connect('mongodb://localhost:27017/miraDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
			if (err) console.error(err);
		})
	}
	console.log("Listening on port 3000")
})

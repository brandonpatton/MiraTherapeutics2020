const express = require('express')
const app = express()
const configRoutes = require('./routes')
const mongoose = require('mongoose')


app.use(express.json());

configRoutes(app)

app.listen(3000, async () => {
	await mongoose.connect('mongodb://mongodb:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if (err) console.error(err);
	})
	console.log("Listening on port 3000")
})

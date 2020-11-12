const express = require('express')
const app = express()
const configRoutes = require('./routes')
const mongoose = require('mongoose')


app.use(express.json());

configRoutes(app)

app.listen(3000, async () => {
	await mongoose.connect('mongodb://localhost:27017/miraTestDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if (err) console.error(err);
	})
	console.log("Listening on port 3000")
})

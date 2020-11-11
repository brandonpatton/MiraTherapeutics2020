const assignmentRoutes = require('./assignments')
const exerciseRoutes = require('./exercises')

const constructorMethod = app => {
	app.get('/', (req, res) => {
		res.send("Welcome")
	})

	app.use('/exercises', exerciseRoutes);
	app.use('/assignments', assignmentRoutes)

	app.use("*", (req, res) => {
		res.status(404).json({error: "Not found"})
	})
}

module.exports = constructorMethod

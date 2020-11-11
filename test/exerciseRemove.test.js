const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Exercise } = require('../data/models/exercise');
const assignmentData = require('../data/methods/exercises')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
let mongoServer;


beforeAll(async () => {
	mongoServer = new MongoMemoryServer();
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if (err) console.error(err);
	})
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe('remove', () => {
	it('should remove an exercise from the database', async () => {
		//expect.assertions(9)

		let testDateAssigned = new Date();
		const flashbackExercise = new Exercise({
            exerciseTitle: 'Flashback Grounding',
            exerciseType: 'Grounding',
            dueDate: testDateAssigned,
            frequency: 'Weekly',
            patientName: 'John Doe',
            patientId: 'PjohnDoe1',
            progress: 0,
            specialInstructions: 'Please let me know if you need any help!'
		});

		const mongoUri = await mongoServer.getUri();
		const insertFlashback = await flashbackExercise.save()

		const res = await assignmentData.removeExercise(mongoUri, insertFlashback._id)
		expect(`Removed exercise with id:${insertFlashback._id}`)

	});

	
})


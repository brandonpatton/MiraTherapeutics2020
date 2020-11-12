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

describe('retrieve', () => {
	it('should retrieve an exercise from the database', async () => {
		expect.assertions(9)

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

		const insertFlashback = await flashbackExercise.save()

		const res = await assignmentData.getExercise(insertFlashback._id)
		expect(res._id).toEqual(insertFlashback._id);
		expect(res.exerciseTitle).toEqual(insertFlashback.exerciseTitle);
		expect(res.exerciseType).toEqual(insertFlashback.exerciseType);
		expect(res.dueDate).toEqual(insertFlashback.dueDate);
        expect(res.frequency).toEqual(insertFlashback.frequency);
		expect(res.patientName).toEqual(insertFlashback.patientName);
		expect(res.patientId).toEqual(insertFlashback.patientId);
		expect(res.progress).toEqual(insertFlashback.progress);
		expect(res.specialInstructions).toEqual(insertFlashback.specialInstructions);

	});

	
})


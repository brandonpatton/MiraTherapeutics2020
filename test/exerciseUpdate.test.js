const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Exercise } = require('../data/models/exercise');
const assignmentData = require('../data/methods/exercises');
const { Assignment } = require('../data/models/assignment');

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

describe('update', () => {
	it('should update an exercise from the database', async () => {
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

		const insertFlashback = await flashbackExercise.save()

        const updatedFlashbackExercise =  new Exercise({
            exerciseTitle: 'New Flashback Grounding',
            exerciseType: 'New Grounding',
            dueDate: testDateAssigned,
            frequency: 'New Weekly',
            patientName: 'New John Doe',
            patientId: 'PjohnDoe2',
            progress: 0,
            specialInstructions: 'Please do not let me know if you need any help!'
		});

		const res = await assignmentData.updateExercise(insertFlashback._id, updatedFlashbackExercise)
		const newFlashbackExercise = await Exercise.findOne({_id: insertFlashback._id});
		expect(res._id).toEqual(newFlashbackExercise._id);
		expect(res.exerciseTitle).toEqual(newFlashbackExercise.exerciseTitle);
		expect(res.exerciseType).toEqual(newFlashbackExercise.exerciseType);
		expect(res.dueDate).toEqual(newFlashbackExercise.dueDate);
        expect(res.frequency).toEqual(newFlashbackExercise.frequency);
		expect(res.patientName).toEqual(newFlashbackExercise.patientName);
		expect(res.patientId).toEqual(newFlashbackExercise.patientId);
		expect(res.progress).toEqual(newFlashbackExercise.progress);
		expect(res.specialInstructions).toEqual(newFlashbackExercise.specialInstructions);

	});

	
})


const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Assignment } = require('../data/models/assignment');
const { Exercise } = require('../data/models/exercise');
const assignmentData = require('../data/methods/assignments')

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
	it('should remove an assignment with no exercises from the database', async () => {
		//expect.assertions(9)

		let testDateAssigned = new Date();
		const noExerciseAssignment = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1
		});

		const insertInfo = await noExerciseAssignment.save()

		const res = await assignmentData.removeAssignment(insertInfo._id)
		expect(`Successfully removed assignment with id:${insertInfo._id}`)
	});

	it('should remove an assignment with exercises from the database', async () => {

		let testDateAssigned = new Date();
		const mongoUri = await mongoServer.getUri();

		const flashbackExercise = new Exercise({
            exerciseTitle: 'Flashback Grounding',
            exerciseType: 'Grounding',
            dueDate: testDateAssigned,
            frequency: 'Daily',
            patientName: 'John Doe',
            patientId: 'PjohnDoe1',
            progress: 0,
            specialInstructions: 'Please let me know if you need any help!'
		});

		const insertFlashback = await flashbackExercise.save()

		const traumaStoryExercise = new Exercise({
			exerciseTitle: 'TraumaStory',
            exerciseType: 'Reading',
            dueDate: testDateAssigned,
            frequency: 'Weekly',
            patientName: 'John Doe',
            patientId: 'PjohnDoe1',
            progress: 0,
            specialInstructions: 'Do this one once a week!'
		})

		const insertTraumaStory = await traumaStoryExercise.save()

		const assignmentWithExercises = new Assignment({
			exerciseList: [insertFlashback._id, insertTraumaStory._id],
			dateAssigned: testDateAssigned,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1
		});

		
		const insertInfo = await assignmentWithExercises.save()

		const res = await assignmentData.removeAssignment(insertInfo._id)
		expect(`Successfully removed assignment with id:${insertInfo._id}`)

	});

	
})


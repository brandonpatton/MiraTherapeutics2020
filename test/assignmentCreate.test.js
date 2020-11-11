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

describe('insert', () => {
	it('should insert an assignment with no exercises', async () => {
		expect.assertions(9)

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

		const mongoUri = await mongoServer.getUri();
		let insertInfo = await assignmentData.createAssignment(mongoUri, noExerciseAssignment);

		const res = await Assignment.findOne({ _id: insertInfo._id });
		expect(res._id).toEqual(insertInfo._id);
		expect(res.exerciseList.length).toEqual(insertInfo.exerciseList.length);
		expect(res.dateAssigned).toEqual(insertInfo.dateAssigned);
		expect(res.patientName).toEqual(insertInfo.patientName);
		expect(res.patientId).toEqual(insertInfo.patientId);
		expect(res.therapistName).toEqual(insertInfo.therapistName);
		expect(res.therapistId).toEqual(insertInfo.therapistId);
		expect(res.assignmentProgress).toEqual(insertInfo.assignmentProgress);
		expect(res.visitNumber).toEqual(insertInfo.visitNumber);

	});

	it('should insert an assignment with exercises', async () => {
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

		
		const insertInfo = await assignmentData.createAssignment(mongoUri, assignmentWithExercises);

		const res = await Assignment.findOne({ _id: insertInfo._id})
		expect.assertions(10 + res.exerciseList.length)
		expect(res._id).toEqual(insertInfo._id);
		expect(res.exerciseList.length).toEqual(insertInfo.exerciseList.length)
		expect(res.exerciseList[0]).toEqual(insertInfo.exerciseList[0]);
		for (let i = 0; i < res.exerciseList.length; i++) expect(res.exerciseList[i]).toEqual(insertInfo.exerciseList[i])
		expect(res.dateAssigned).toEqual(insertInfo.dateAssigned);
		expect(res.patientName).toEqual(insertInfo.patientName);
		expect(res.patientId).toEqual(insertInfo.patientId);
		expect(res.therapistName).toEqual(insertInfo.therapistName);
		expect(res.therapistId).toEqual(insertInfo.therapistId);
		expect(res.assignmentProgress).toEqual(insertInfo.assignmentProgress);
		expect(res.visitNumber).toEqual(insertInfo.visitNumber);

	});

	
})

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Assignment } = require('../data/models/assignment');
const { Exercise } = require('../data/models/exercise');
const assignmentData = require('../data/assignments')

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
		let insertionInfo = await assignmentData.createAssignment(mongoUri, noExerciseAssignment.exerciseList, noExerciseAssignment.dateAssigned, noExerciseAssignment.patientName, noExerciseAssignment.patientId, noExerciseAssignment.therapistName, noExerciseAssignment.therapistId, noExerciseAssignment.assignmentProgress, noExerciseAssignment.visitNumber);

		const res = await Assignment.findOne({ _id: insertionInfo._id });
		expect(res._id).toEqual(insertionInfo._id);
		expect(res.exerciseList.length).toEqual(insertionInfo.exerciseList.length);
		expect(res.dateAssigned).toEqual(insertionInfo.dateAssigned);
		expect(res.patientName).toEqual(insertionInfo.patientName);
		expect(res.patientId).toEqual(insertionInfo.patientId);
		expect(res.therapistName).toEqual(insertionInfo.therapistName);
		expect(res.therapistId).toEqual(insertionInfo.therapistId);
		expect(res.assignmentProgress).toEqual(insertionInfo.assignmentProgress);
		expect(res.visitNumber).toEqual(insertionInfo.visitNumber);

	});

	
})


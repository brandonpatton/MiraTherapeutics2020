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

describe('retrieve', () => {
	it('should retrieve an assignment from the database', async () => {
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
		const insertInfo = await noExerciseAssignment.save()

		const res = await assignmentData.getAssignment(mongoUri, insertInfo._id)
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

	
})


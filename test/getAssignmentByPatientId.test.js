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
	it('should retrieve an assignment with a matching patientId from the database', async () => {
		expect.assertions(1)

		let testDateAssigned = new Date();
		const johnDoeAssignment = new Assignment({
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
		const insertInfo = await johnDoeAssignment.save()

		const res = await assignmentData.getAssignmentByPatientId(mongoUri, 'PjohnDoe1')
        expect(res.patientId).toEqual('PjohnDoe1');
    });
    
})
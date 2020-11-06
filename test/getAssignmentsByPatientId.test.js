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
		expect.assertions(2)

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

		const johnDoeAssignment2 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 2
		});

		const mongoUri = await mongoServer.getUri();
		const insertInfo = await johnDoeAssignment.save()
		const insertInfo2 = await johnDoeAssignment2.save()

		const res = await assignmentData.getAssignmentsByPatientId(mongoUri, 'PjohnDoe1')
		for (let i = 0; i < res.length; i++){
			expect(res[i].patientId).toEqual('PjohnDoe1');
		}  
    });
    
})
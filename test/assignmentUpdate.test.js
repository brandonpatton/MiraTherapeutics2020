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

describe('update', () => {
	it('should update an assignment', async () => {
		//expect.assertions(9)

        let testDateAssigned = new Date();
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


		testDateAssigned = new Date();
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
		let insertInfo = await noExerciseAssignment.save();

        const res = await Assignment.findOne({ _id: insertInfo._id });
        
        const noExerciseUpdated = {
            exerciseList: [insertFlashback],
			dateAssigned: testDateAssigned,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 25,
			visitNumber: 1
        }

        const updatedAssignment = await assignmentData.updateAssignment(mongoUri, res._id, noExerciseUpdated)
        const retrievedUpdatedAssignment = await Assignment.findOne({ _id: res._id});

		expect(updatedAssignment._id).toEqual(retrievedUpdatedAssignment._id);
		expect(updatedAssignment.exerciseList.length).toEqual(retrievedUpdatedAssignment.exerciseList.length);
		expect(updatedAssignment.dateAssigned).toEqual(retrievedUpdatedAssignment.dateAssigned);
		expect(updatedAssignment.patientName).toEqual(retrievedUpdatedAssignment.patientName);
		expect(updatedAssignment.patientId).toEqual(retrievedUpdatedAssignment.patientId);
		expect(updatedAssignment.therapistName).toEqual(retrievedUpdatedAssignment.therapistName);
		expect(updatedAssignment.therapistId).toEqual(retrievedUpdatedAssignment.therapistId);
		expect(updatedAssignment.assignmentProgress).toEqual(retrievedUpdatedAssignment.assignmentProgress);
		expect(updatedAssignment.visitNumber).toEqual(retrievedUpdatedAssignment.visitNumber);

	});

	
})


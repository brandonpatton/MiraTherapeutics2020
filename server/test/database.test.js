const assert = require('assert')
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Assignment } = require('../data/models/assignment');
const { Exercise } = require('../data/models/exercise');
const { Therapist } = require('../data/models/therapists');
const { Patient } = require('../data/models/patients')
const assignmentData = require('../data/methods/assignments')
const exerciseData = require('../data/methods/exercises');
const therapistData = require('../data/methods/therapists');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
let mongoServer;


beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		if (err) console.error(err);
	})
});

afterEach(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

const checkExerciseEquality = (exercise1, exercise2) => {
	expect(exercise1._id).toEqual(exercise2._id);
	expect(exercise1.exerciseTitle).toEqual(exercise2.exerciseTitle);
	expect(exercise1.exerciseType).toEqual(exercise2.exerciseType);
	expect(exercise1.dueDate).toEqual(exercise2.dueDate);
	expect(exercise1.frequency).toEqual(exercise2.frequency);
	expect(exercise1.patientName).toEqual(exercise2.patientName);
	expect(exercise1.patientId).toEqual(exercise2.patientId);
	expect(exercise1.progress).toEqual(exercise2.progress);
	expect(exercise1.specialInstructions).toEqual(exercise2.specialInstructions);
}

const checkAssignmentEqualty = (assignment1, assignment2) => {
	expect(assignment1._id).toEqual(assignment2._id);
	expect(assignment1.exerciseList.length).toEqual(assignment2.exerciseList.length);
	for (let i = 0; i < assignment1.exerciseList.length; i++) {
		checkExerciseEquality(assignment1.exerciseList[i], assignment2.exerciseList[i])
	}
	expect(assignment1.dateAssigned).toEqual(assignment2.dateAssigned);
	expect(assignment1.due).toEqual(assignment2.due);
	expect(assignment1.patientName).toEqual(assignment2.patientName);
	expect(assignment1.patientId).toEqual(assignment2.patientId);
	expect(assignment1.therapistName).toEqual(assignment2.therapistName);
	expect(assignment1.therapistId).toEqual(assignment2.therapistId);
	expect(assignment1.assignmentProgress).toEqual(assignment2.assignmentProgress);
	expect(assignment1.visitNumber).toEqual(assignment2.visitNumber);
	expect(assignment1.overallInstructions).toEqual(assignment2.overallInstructions);
	expect(assignment1.completedByTherapist).toEqual(assignment2.completedByTherapist);
} 

const checkAssignmentListEquality = (assignmentList1, assignmentList2) => {
	expect(assignmentList1.length).toEqual(assignmentList2.length)
	for (let i = 0; i < assignmentList1.length; i++) {
		checkAssignmentEqualty(assignmentList1[i], assignmentList2[i])
	}
}

describe('insert', () => {
	it('should insert an assignment with no exercises', async () => {

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)
		const noExerciseAssignment = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'Do your best!',
			completedByTherapist: false
		});

		let insertInfo = await assignmentData.createAssignment(noExerciseAssignment);

		const res = await Assignment.findOne({ _id: insertInfo._id });

		checkAssignmentEqualty(res, insertInfo)

		await expect(assignmentData.createAssignment()).rejects.toThrow()

	});

	it('should insert an assignment with exercises', async () => {
		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

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
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'Hooray!',
			completedByTherapist: false
		});

		
		const insertInfo = await assignmentData.createAssignment(assignmentWithExercises);

		const res = await Assignment.findOne({ _id: insertInfo._id})
		checkAssignmentEqualty(res, insertInfo)

	});

	
})

describe('retrieve', () => {
	it('should retrieve an assignment with no exercises from the database', async () => {

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

		const noExerciseAssignment = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'This sure is an assignment',
			completedByTherapist: false
		});

		const insertInfo = await noExerciseAssignment.save()

		const res = await assignmentData.getAssignment(insertInfo._id)
		checkAssignmentEqualty(res, insertInfo)

		let badId = mongoose.Types.ObjectId()
		await expect(assignmentData.getAssignment(badId)).rejects.toEqual('No assignment exists with that id')

	});

	it('should retrieve an assignment with exercises from the database', async () => {

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

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
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'Bonjour',
			completedByTherapist: false
		});

		
		const insertInfo = await assignmentWithExercises.save()

		const res = await assignmentData.getAssignment(insertInfo._id)
		checkAssignmentEqualty(res, insertInfo)

	});
})

describe('remove', () => {
	it('should remove an assignment with no exercises from the database', async () => {
		//expect.assertions(9)

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)
		
		const noExerciseAssignment = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'Good luck!',
			completedByTherapist: false
		});

		const insertInfo = await noExerciseAssignment.save()

		const res = await assignmentData.removeAssignment(insertInfo._id)
		expect(`Successfully removed assignment with id:${insertInfo._id}`)
	});

	it('should remove an assignment with exercises from the database', async () => {

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

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
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'This is just a test',
			completedByTherapist: false
		});

		
		const insertInfo = await assignmentWithExercises.save()

		const res = await assignmentData.removeAssignment(insertInfo._id)
		expect(`Successfully removed assignment with id:${insertInfo._id}`)
		await expect(assignmentData.removeAssignment(insertInfo._id)).rejects.toEqual('No assignment exists with that id')

	});	
})

describe('update', () => {
	it('should update an assignment', async () => {
		//expect.assertions(9)

        let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

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
		testDue = new Date(testDateAssigned.getTime() + 60000)

		const noExerciseAssignment = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'Have some instructions',
			completedByTherapist: false
		});
 
		let insertInfo = await noExerciseAssignment.save();

        const res = await Assignment.findOne({ _id: insertInfo._id });
        
        const noExerciseUpdated = {
            exerciseList: [insertFlashback],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 25,
			visitNumber: 1,
			overallInstructions: 'This one has progress!',
			completedByTherapist: false
        }

        const updatedAssignment = await assignmentData.updateAssignment(res._id, noExerciseUpdated)
        const retrievedUpdatedAssignment = await Assignment.findOne({ _id: res._id});

		checkExerciseEquality(updatedAssignment, retrievedUpdatedAssignment)

	});
})

describe('insert', () => {
	it('should insert an exercise to the database', async () => {
		

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

		const flashbackExercise = new Exercise({
            exerciseTitle: 'Flashback Grounding',
            exerciseType: 'Grounding',
            dueDate: testDue,
            frequency: 'Weekly',
            patientName: 'John Doe',
            patientId: 'PjohnDoe1',
            progress: 0,
            specialInstructions: 'Please let me know if you need any help!'
		});

		const insertFlashback = await exerciseData.createExerciseBatch([flashbackExercise]);

		const res = await Exercise.findOne({ _id: insertFlashback._id })
		checkExerciseEquality(insertFlashback, [res])

		await expect(exerciseData.createExerciseBatch()).rejects.toThrow()

	});
})

describe('insert', () => {
	it('should insert multiple exercises to the database', async () => {
		

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

		const flashbackExercise = new Exercise({
            exerciseTitle: 'Flashback Grounding',
            exerciseType: 'Grounding',
            dueDate: testDue,
            frequency: 'Weekly',
            patientName: 'John Doe',
            patientId: 'PjohnDoe1',
            progress: 0,
            specialInstructions: 'Please let me know if you need any help!'
		});

		const colorFinderExercise = new Exercise({
            exerciseTitle: 'Color Finder',
            exerciseType: 'Grounding',
            dueDate: testDue,
            frequency: 'Daily',
            patientName: 'John Doe',
            patientId: 'PjohnDoe1',
            progress: 0,
            specialInstructions: 'Please let me know if you need any help!'
		});

		const insertExercises = await exerciseData.createExerciseBatch([flashbackExercise, colorFinderExercise]);

		const res = [await Exercise.findOne({ _id: insertExercises[0]._id }), await Exercise.findOne({ _id: insertExercises[1]._id })]
		checkExerciseEquality(insertExercises[0], res[0])
		checkExerciseEquality(insertExercises[1], res[1])

		await expect(exerciseData.createExerciseBatch()).rejects.toThrow()

	});
})

describe('retrieve', () => {
	it('should retrieve an exercise from the database', async () => {

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

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

		const res = await exerciseData.getExercise(insertFlashback._id)
		checkExerciseEquality(res, insertFlashback)

		let badId = mongoose.Types.ObjectId();
		await expect(exerciseData.getExercise(badId)).rejects.toEqual('No exercise exists with that id')

	});	
})

describe('remove', () => {
	it('should remove an exercise from the database', async () => {
		//expect.assertions(9)

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

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

		const res = await exerciseData.removeExercise(insertFlashback._id)
		expect(`Removed exercise with id:${insertFlashback._id}`)

		await expect(exerciseData.removeExercise(insertFlashback._id)).rejects.toEqual('No exercise exists with that ID')

	});
})

describe('update', () => {
	it('should update an exercise from the database', async () => {
		//expect.assertions(9)

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

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

		const res = await exerciseData.updateExercise(insertFlashback._id, updatedFlashbackExercise)
		const newFlashbackExercise = await Exercise.findOne({_id: insertFlashback._id});
		checkExerciseEquality(res, newFlashbackExercise)

	});
})

describe('retrieve', () => {
	it('should retrieve an assignment with a matching patientId from the database', async () => {
		expect.assertions(3)

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

		const johnDoeAssignment = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'Hang in there',
			completedByTherapist: false
		});

		const johnDoeAssignment2 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 2,
			overallInstructions: 'This is for the second visit',
			completedByTherapist: false
		});

		const insertInfo = await johnDoeAssignment.save()
		const insertInfo2 = await johnDoeAssignment2.save()

		const res = await assignmentData.getAssignmentsByPatientId('PjohnDoe1')
		for (let i = 0; i < res.length; i++){
			expect(res[i].patientId).toEqual('PjohnDoe1');
		}

		await expect(assignmentData.getAssignmentsByPatientId('badPatientId')).rejects.toEqual('No assignment exists with that patientId')
    });
    
})

describe('retrieve', () => {
	it('should retrieve an object that maps supplied patient IDs to their assignment lists', async () => {

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

		// Make assignments to retrieve
		const johnDoeAssignment = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'Hang in there',
			completedByTherapist: false
		});

		const johnDoeAssignment2 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 2,
			overallInstructions: 'This is for the second visit',
			completedByTherapist: false
		});

		const pattyPancakesAssignment1 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'Patty Pancakes',
			patientId: 'PpattyPancakes1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'You are doing amazing',
			completedByTherapist: false
		});

		const pattyPancakesAssignment2 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'Patty Pancakes',
			patientId: 'PpattyPancakes1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 2,
			overallInstructions: 'Keep it up!',
			completedByTherapist: false
		});

		const pattyPancakesAssignment3 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'Patty Pancakes',
			patientId: 'PpattyPancakes1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 3,
			overallInstructions: 'It is time for the third assignment!',
			completedByTherapist: false
		});

		const stubertSizzoAssignment1 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'Stubert Sizzo',
			patientId: 'PstubertSizzo1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'Nice one!',
			completedByTherapist: false
		});

		const stubertSizzoAssignment2 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'Stubert Sizzo',
			patientId: 'PstubertSizzo1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 2,
			overallInstructions: 'Wow!',
			completedByTherapist: false
		});

		const stubertSizzoAssignment3 = new Assignment({
			exerciseList: [],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'Stubert Sizzo',
			patientId: 'PstubertSizzo1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 3,
			overallInstructions: 'Okay.',
			completedByTherapist: false
		});

		// Will have patient IDs as keys and assignment lists as values
		let patientIdToAssignments = {}

		// Assign the assignment lists to the correct patient IDs
		patientIdToAssignments['PjohnDoe1'] = [await johnDoeAssignment.save(), await johnDoeAssignment2.save()].reverse()
		patientIdToAssignments['PpattyPancakes1'] = [await pattyPancakesAssignment1.save(), await pattyPancakesAssignment2.save(), await pattyPancakesAssignment3.save()].reverse()
		patientIdToAssignments['PstubertSizzo1'] = [await stubertSizzoAssignment1.save(), await stubertSizzoAssignment2.save(), await stubertSizzoAssignment3.save()].reverse()
	
		// Check that each patient ID in the response object has the right assignment list
		const resObj = await assignmentData.getAssignmentsByBatchPatientIds(['PjohnDoe1', 'PpattyPancakes1', 'PstubertSizzo1'])
		resObj
		for (let patientId in resObj){
			checkAssignmentListEquality(patientIdToAssignments[patientId], resObj[patientId])
		}

    });
    
})

describe('retrieve', () => {
	test('should retrieve therapists from their ID', async () => {
		expect.assertions(6)

		const therapistJD = new Therapist({
			therapistName: 'John Doe',
			therapistEmail: 'jdoe@therapy.com'
		});

		const therapistTP = new Therapist({
			therapistName: 'Therra Pea',
			therapistEmail: 'tpea@therapy.com'
		});

		const insertJD = await therapistJD.save()
		const insertTP = await therapistTP.save()


		const jd = await therapistData.getTherapist(insertJD._id)
		const tp = await therapistData.getTherapist(insertTP._id)
			expect(jd.therapistName).toEqual('John Doe')
			expect(jd.therapistEmail).toEqual('jdoe@therapy.com')
			expect(tp.therapistName).toEqual('Therra Pea')
			expect(tp.therapistEmail).toEqual('tpea@therapy.com')
			await expect(therapistData.getTherapist()).rejects.toEqual('No ID provided');
			let badId = mongoose.Types.ObjectId()
			await expect(therapistData.getTherapist(badId)).rejects.toEqual('No therapist exists with that id');
    });
    
})

describe('retrieve', () => {
	it('should retrieve the patients that are associated with the therapist', async () => {
		expect.assertions(4)

		const therapistJD = new Therapist({
			therapistName: 'John Doe',
			therapistEmail: 'jdoe@therapy.com'
		});

		const therapistTP = new Therapist({
			therapistName: 'Therra Pea',
			therapistEmail: 'tpea@therapy.com'
		});

		const insertJD = await therapistJD.save()
		const insertTP = await therapistTP.save()

		const patientPM = new Patient({
			patientName: 'Patient McPatientFace',
			patientEmail: 'pm@patient.com',
			therapistId: insertJD._id,
		})
		patientPM.save()

		const patientCK = new Patient({
			patientName: 'Clark Kent',
			patientEmail: 'ck@patient.com',
			therapistId: insertJD._id,
		})
		patientCK.save()

		const patientBW = new Patient({
			patientName: 'Bruce Wayne',
			patientEmail: 'pm@patient.com',
			therapistId: insertJD._id,
		})
		patientBW.save()

		const patientDP = new Patient({
			patientName: 'Diana Prince',
			patientEmail: 'dp@patient.com',
			therapistId: insertJD._id,
		})
		patientDP.save()

		const patientBA = new Patient({
			patientName: 'Barry Allen',
			patientEmail: 'ba@patient.com',
			therapistId: insertJD._id,
		})
		patientBA.save()

		const patientSR = new Patient({
			patientName: 'Steve Rogers',
			patientEmail: 'sr@patient.com',
			therapistId: insertTP._id,
		})
		patientSR.save()

		const patientBB = new Patient({
			patientName: 'Bruce Banner',
			patientEmail: 'bb@patient.com',
			therapistId: insertTP._id,
		})
		patientBB.save()

		const jdPatients = await therapistData.getPatientsByTherapistId(insertJD._id)
		const tpPatients = await therapistData.getPatientsByTherapistId(insertTP._id)
			expect(jdPatients.length).toEqual(5)
			expect(tpPatients.length).toEqual(2)
			let badId = mongoose.Types.ObjectId()
			await expect(therapistData.getPatientsByTherapistId(badId)).rejects.toEqual('No therapist exists with that id');
			await expect(therapistData.getPatientsByTherapistId()).rejects.toEqual('No ID provided');
    });
    
})
describe('update', () => {
	it('should update an assignment upon exercise completion', async () => {
		//expect.assertions(9)

		let testDateAssigned = new Date();
		let testDue = new Date(testDateAssigned.getTime() + 60000)

		const flashbackExercise = new Exercise({
            exerciseTitle: 'Flashback Grounding',
            exerciseType: 'Grounding',
            dueDate: testDateAssigned,
            frequency: 'Weekly',
            patientName: 'John Doe',
            patientId: 'PjohnDoe1',
            progress: 0,
            specialInstructions: 'Please let me know if you need any help!',
            goal:10
		});

		const insertFlashback = await flashbackExercise.save()

		testDateAssigned = new Date();
		testDue = new Date(testDateAssigned.getTime() + 60000)

		const ExerciseAssignment = new Assignment({
			exerciseList: [flashbackExercise],
			dateAssigned: testDateAssigned,
			due: testDue,
			patientName: 'John Doe',
			patientId: 'PjohnDoe1',
			therapistName: 'Jane Doe',
			therapistId: 'TjaneDoe1',
			assignmentProgress: 0,
			visitNumber: 1,
			overallInstructions: 'You have a nice name',
			completedByTherapist: false
		});
 
		let insertInfo = await ExerciseAssignment.save();


        const updatedFlashbackExercise =  new Exercise({
            exerciseTitle: 'New Flashback Grounding',
            exerciseType: 'New Grounding',
            dueDate: testDateAssigned,
            frequency: 'New Weekly',
            patientName: 'New John Doe',
            patientId: 'PjohnDoe1',
            progress: 10,
            specialInstructions: 'Exercise Complete :)',
            goal:10
		});

		const res = await exerciseData.updateExercise(insertFlashback._id, updatedFlashbackExercise)
		const updatedAssignment = await Assignment.findOne({_id: ExerciseAssignment._id});
		expect(updatedAssignment._id).toEqual(ExerciseAssignment._id);
		expect(updatedAssignment.exerciseList.length).toEqual(ExerciseAssignment.exerciseList.length);
		expect(updatedAssignment.dateAssigned).toEqual(ExerciseAssignment.dateAssigned);
		expect(updatedAssignment.due).toEqual(ExerciseAssignment.due);
		expect(updatedAssignment.patientName).toEqual(ExerciseAssignment.patientName);
		expect(updatedAssignment.patientId).toEqual(ExerciseAssignment.patientId);
		expect(updatedAssignment.therapistName).toEqual(ExerciseAssignment.therapistName);
		expect(updatedAssignment.therapistId).toEqual(ExerciseAssignment.therapistId);
		expect(updatedAssignment.assignmentProgress).toEqual(1);
		expect(updatedAssignment.visitNumber).toEqual(ExerciseAssignment.visitNumber);
		expect(updatedAssignment.overallInstructions).toEqual(ExerciseAssignment.overallInstructions);
		expect(updatedAssignment.completedByTherapist).toEqual(ExerciseAssignment.completedByTherapist);

	});
})
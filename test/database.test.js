const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Assignment } = require('../data/models/assignment');
const { Exercise } = require('../data/models/exercise');
const { Therapist } = require('../data/models/therapists');
const { Patient } = require('../data/models/patients')
const assignmentData = require('../data/methods/assignments')
const exerciseData = require('../data/methods/exercises');
const therapistData = require('../data/methods/therapists')

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

		let insertInfo = await assignmentData.createAssignment(noExerciseAssignment);

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

		
		const insertInfo = await assignmentData.createAssignment(assignmentWithExercises);

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

describe('retrieve', () => {
	it('should retrieve an assignment with no exercises from the database', async () => {
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

		const insertInfo = await noExerciseAssignment.save()

		const res = await assignmentData.getAssignment(insertInfo._id)
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

	it('should retrieve an assignment with exercises from the database', async () => {

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

		const res = await assignmentData.getAssignment(insertInfo._id)
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

        const updatedAssignment = await assignmentData.updateAssignment(res._id, noExerciseUpdated)
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

describe('insert', () => {
	it('should insert an exercise from the database', async () => {
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

		const insertFlashback = await exerciseData.createExercise(flashbackExercise);

		const res = await Exercise.findOne({ _id: insertFlashback._id })
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

		const res = await exerciseData.getExercise(insertFlashback._id)
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

describe('remove', () => {
	it('should remove an exercise from the database', async () => {
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

		const res = await exerciseData.removeExercise(insertFlashback._id)
		expect(`Removed exercise with id:${insertFlashback._id}`)

	});
})

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

		const res = await exerciseData.updateExercise(insertFlashback._id, updatedFlashbackExercise)
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

		const insertInfo = await johnDoeAssignment.save()
		const insertInfo2 = await johnDoeAssignment2.save()

		const res = await assignmentData.getAssignmentsByPatientId('PjohnDoe1')
		for (let i = 0; i < res.length; i++){
			expect(res[i].patientId).toEqual('PjohnDoe1');
		}  
    });
    
})

describe('retrieve', () => {
	it('should retrieve the patients that are associated with the therapist', async () => {
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
		try {
			expect(jd.therapistName).toEqual('John Doe')
			expect(jd.therapistEmail).toEqual('jdoe@therapy.com')
			expect(tp.therapistName).toEqual('Therra Pea')
			expect(tp.therapistEmail).toEqual('tpea@therapy.com')
			await therapistData.getPatientsByTherapistId()
		} catch (e) {
			expect(e).toEqual('No ID provided')
		}
		try {
			await therapistData.getPatientsByTherapistId('badID')
		} catch (e) {
			expect(e).toEqual('CastError: Cast to ObjectId failed for value "badID" at path "_id" for model "Therapist"')
		}
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
		try {
			expect(jdPatients.length).toEqual(5)
			expect(tpPatients.length).toEqual(2)
			await therapistData.getPatientsByTherapistId()
		} catch (e) {
			expect(e).toEqual('No ID provided')
		}
		try {
			await therapistData.getPatientsByTherapistId('badID')
		} catch (e) {
			expect(e).toEqual('CastError: Cast to ObjectId failed for value "badID" at path "_id" for model "Therapist"')
		}
    });
    
})
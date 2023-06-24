import express from 'express'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'

const router = express.Router()

// Creating a faculty
router.post('/create-faculty', validateRequest(AcademicFacultyValidation.createFacultyZodSchema), AcademicFacultyController.createFaculty);

// Getting all the Faculty
router.get('/', AcademicFacultyController.getAllFaculty);

// Getting a particular faculty
router.get('/:id',AcademicFacultyController.getParticularFaculty);

// Updating a faculty
router.patch('/:id',AcademicFacultyController.updateFaculty);

// Deleting a particular faculty
router.delete('/:id', AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoute = router;
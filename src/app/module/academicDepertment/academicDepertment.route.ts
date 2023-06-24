import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepertment.validation";
import { AcademicDepartmentController } from "./academicDepertment.controller";

const router = express.Router()

router.post('/create-department',validateRequest(academicDepartmentValidation.createDepartmentZodSchema),AcademicDepartmentController.createDepartment)

router.get('/',AcademicDepartmentController.getAllAcademicDepartment); 

router.get('/:id',AcademicDepartmentController.getParticularDepartment); 

router.delete('/:id', AcademicDepartmentController.deleteParticularDepartment); 

router.patch('/:id', AcademicDepartmentController.updateDepartment)

export const AcademicDepartmentRoute = router;
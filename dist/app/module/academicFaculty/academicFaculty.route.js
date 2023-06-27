"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoute = void 0;
const express_1 = __importDefault(require("express"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const router = express_1.default.Router();
// Creating a faculty
router.post('/create-faculty', (0, validateRequest_1.default)(academicFaculty_validation_1.AcademicFacultyValidation.createFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.createFaculty);
// Getting all the Faculty
router.get('/', academicFaculty_controller_1.AcademicFacultyController.getAllFaculty);
// Getting a particular faculty
router.get('/:id', academicFaculty_controller_1.AcademicFacultyController.getParticularFaculty);
// Updating a faculty
router.patch('/:id', academicFaculty_controller_1.AcademicFacultyController.updateFaculty);
// Deleting a particular faculty
router.delete('/:id', academicFaculty_controller_1.AcademicFacultyController.deleteFaculty);
exports.AcademicFacultyRoute = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepertment_validation_1 = require("./academicDepertment.validation");
const academicDepertment_controller_1 = require("./academicDepertment.controller");
const router = express_1.default.Router();
router.post('/create-department', (0, validateRequest_1.default)(academicDepertment_validation_1.academicDepartmentValidation.createDepartmentZodSchema), academicDepertment_controller_1.AcademicDepartmentController.createDepartment);
router.get('/', academicDepertment_controller_1.AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:id', academicDepertment_controller_1.AcademicDepartmentController.getParticularDepartment);
router.delete('/:id', academicDepertment_controller_1.AcademicDepartmentController.deleteParticularDepartment);
router.patch('/:id', (0, validateRequest_1.default)(academicDepertment_validation_1.academicDepartmentValidation.updateAcademicDepartmentZodSchema), academicDepertment_controller_1.AcademicDepartmentController.updateDepartment);
exports.AcademicDepartmentRoute = router;

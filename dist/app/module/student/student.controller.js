"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const pick_1 = __importDefault(require("../shared/pick"));
const student_constants_1 = require("./student.constants");
const student_service_1 = require("./student.service");
// import httpStatus from 'http-status';
// Getting all the semester here.
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, student_constants_1.studentFilterableFields);
        const paginationOption = (0, pick_1.default)(req.query, [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
        ]);
        const result = yield student_service_1.StudentService.getAllStudents(filters, paginationOption);
        res.status(200).json({
            success: true,
            message: 'Students retrieved successfully',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
// Getting single semester.
const getSingleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield student_service_1.StudentService.getSingleStudent(id);
        res.status(200).json({
            success: true,
            message: 'Particular Semester retrieved successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = yield student_service_1.StudentService.updateStudent(id, updatedData);
        res.status(200).json({
            success: true,
            message: 'Student data is updated successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield student_service_1.StudentService.deleteStudent(id);
        res.status(200).json({
            success: true,
            message: 'Semester deleted successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.StudentController = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent
};

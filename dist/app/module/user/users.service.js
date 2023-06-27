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
const users_model_1 = require("./users.model");
const user_utils_1 = require("./user.utils");
const index_1 = __importDefault(require("../../../config/index"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../student/student.model");
const http_status_1 = __importDefault(require("http-status"));
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Default Password
    if (!user.password) {
        user.password = index_1.default.default_student_password;
    }
    // Setting the role
    user.role = 'student';
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(student.academicSemester);
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateStudentId)(academicSemester);
        user.id = id;
        student.id = id;
        const newStudent = yield student_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        user.student = newStudent[0]._id;
        // Setting student _id into user.student
        const newUser = yield users_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        // Commiting the transaction
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield users_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'student',
            populate: [
                {
                    path: 'academicSemester'
                },
                {
                    path: 'academicDepartment'
                },
                {
                    path: 'academicFaculty'
                }
            ]
        });
    }
    return newUserAllData;
});
exports.default = {
    createStudent
};

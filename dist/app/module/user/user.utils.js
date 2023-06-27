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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFacultyId = exports.findLastFacultyId = exports.generateStudentId = exports.findLastUserId = void 0;
const users_model_1 = require("./users.model");
const findLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield users_model_1.User.findOne({
        role: 'student'
    }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id) ? lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(4) : undefined;
});
exports.findLastUserId = findLastUserId;
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastUserId)()) || (0).toString().padStart(5, '0');
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
// For the faculty
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield users_model_1.User.findOne({
        role: 'faculty'
    }, { id: 1, _id: 0 }).sort({
        createdAt: -1,
    }).lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id.substring(2) : undefined;
});
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = ((yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, '0'));
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generateFacultyId = generateFacultyId;
// Note: lean() is used to make the database provide data faster.
// Note: padStart(5, '0')

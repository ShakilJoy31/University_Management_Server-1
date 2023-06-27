"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../module/user/user.route"));
const academinSemester_route_1 = require("../module/academicSemester/academinSemester.route");
const academicFaculty_route_1 = require("../module/academicFaculty/academicFaculty.route");
const academicDepertment_route_1 = require("../module/academicDepertment/academicDepertment.route");
const student_route_1 = require("../module/student/student.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.default
    },
    {
        path: '/academic-semester',
        route: academinSemester_route_1.AcademicSemesterRoute
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.AcademicFacultyRoute
    },
    {
        path: '/academic-department',
        route: academicDepertment_route_1.AcademicDepartmentRoute
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

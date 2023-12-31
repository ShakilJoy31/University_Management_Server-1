import express from 'express'
import userRouter from '../module/user/user.route'
import { AcademicSemesterRoute } from '../module/academicSemester/academinSemester.route';
import { AcademicFacultyRoute } from '../module/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../module/academicDepertment/academicDepertment.route';
import { StudentRoutes } from '../module/student/student.route';

const router = express.Router()

const moduleRoutes = [ 
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoute
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRoute
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRoute
    },
    {
        path: '/students',
        route: StudentRoutes
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;
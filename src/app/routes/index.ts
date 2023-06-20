import express from 'express'
import userRouter from '../module/user/user.route'
import { AcademicSemesterRoute } from '../module/academicSemester/academinSemester.route';

const router = express.Router()

const moduleRoutes = [
    {
        path: '/users/',
        route: userRouter
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoute
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;
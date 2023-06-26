import { User } from './users.model';
import { IUser } from './user.schema'
import { generateStudentId } from './user.utils';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiErrors';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
const createStudent = async (student:IStudent, user: IUser):Promise<IUser | null> => {

    // Default Password
    if(!user.password){
        user.password = config.default_student_password as string;
    }

    // Setting the role
     user.role = 'student';
     const academicSemester = await AcademicSemester.findById(student.academicSemester);

     let newUserAllData = null;

     const session = await mongoose.startSession();
     try{
        session.startTransaction()
        const id = await generateStudentId(academicSemester);
        user.id = id
        student.id = id
        const newStudent = await Student.create([student],{session})

        if(!newStudent.length){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }
        user.student = newStudent[0]._id;

        // Setting student _id into user.student
        const newUser = await User.create([user], {session})

        if(!newUser.length){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }

        newUserAllData = newUser[0];

        // Commiting the transaction
        await session.commitTransaction()
        await session.endSession()
     }catch(error){
        await session.abortTransaction()
        await session.endSession()
        throw error;
     }

     if(newUserAllData){
        newUserAllData = await User.findOne({id: newUserAllData.id}).populate({
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
        })
     }
     return newUserAllData;
}

export default {
    createStudent
}
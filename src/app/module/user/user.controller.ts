import { RequestHandler } from "express"
import userService from './users.service' 

const createStudentController :RequestHandler = async (req, res, next) =>{
    try{
        const {student, ...userData} = req.body;
        const result = await userService.createStudent(student, userData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result 
        })
    }catch(err){
        next(err);
    }
}

export default {
    createStudentController
}
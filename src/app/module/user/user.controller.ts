import { RequestHandler } from "express"
import userService from './users.service' 

const createUserController :RequestHandler = async (req, res, next) =>{
    try{
        const {user} = req.body;
        const result = await userService.createUser(user);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result
        })
    }catch(err){
        next(err);
        // res.status(400).json({
        //     success: false,
        //     message: 'Failed to create user'
        // })
    }
}

export default {
    createUserController
}
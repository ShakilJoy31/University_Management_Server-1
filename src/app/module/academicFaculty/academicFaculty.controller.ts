import { NextFunction, Request, RequestHandler, Response } from "express";
import { AcademicFacultyService } from "./academicFaculty.service";
import pick from "../shared/pick";
import { academicFacultyFilterableField } from "./academicFaculty.constants";
import { paginationFields } from "../../../constants/pagination";

const createFaculty:RequestHandler = async (req:Request, res: Response, next: NextFunction) =>{
    try{
        const {...academicFacultyData} = req.body;
        const result = await AcademicFacultyService.createFaculty(academicFacultyData);
        res.status(200).json({
            success: true,
            message: 'Academic Faculty is created successfully',
            data: result,
          });
    }catch(error){
        next(error);
    }
}

// Getting all the faculty
const getAllFaculty:RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const filters = pick(req.query, academicFacultyFilterableField);

    const paginationOptions = pick(req.query, paginationFields);

    const result = AcademicFacultyService.getAllFaculty(filters, paginationOptions);

    res.status(200).json({
        success: true,
        message: 'Academic Faculties retrieved successfully',
        meta: (await result).meta,
        data: (await result).data,
    })
    }catch(error){
        next(error);
    }
}

const updateFaculty = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updatedFaculty(id, updatedData);
    res.status(200).json({
        success: true,
        message: 'Faculty is updated successfully.',
        data: result
    })
    }catch(error){
        next(error);
    }
}

const getParticularFaculty = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const {id} = req.params;
        const result = await AcademicFacultyService.getParticularFaculty(id);
        res.status(200).json({
            success: true,
            message: 'Particular faculty retrieved successfully',
            data: result
        })
    }catch(error){
        next(error);
    }
}

const deleteFaculty = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params;
    const result = AcademicFacultyService.deleteFaculty(id);
    res.status(200).json({
        success: true,
        message: 'Faculty is deleted successfully',
        data: result
    })
    }catch(error){
        next(error)
    }

}

export const AcademicFacultyController = {
    createFaculty,
    getAllFaculty,
    updateFaculty,
    getParticularFaculty,
    deleteFaculty
}
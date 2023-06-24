import { NextFunction, Request, RequestHandler, Response } from "express";
import { AcademicDepartmentService } from "./academicDepertment.service";
import pick from "../shared/pick";
import { academicDepartmentFilterableField } from "./academicDepertment.constants";
import { paginationFields } from "../../../constants/pagination";

const createDepartment:RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {...academicDepartmentData} = req.body;
        const result = await AcademicDepartmentService.createDepartment(academicDepartmentData);
        res.status(200).json({
            success: true,
            message: 'Academic Department is created successfully',
            data: result
        })
    }catch(error){
        next(error)
    }
}

const getAllAcademicDepartment:RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const filters = pick(req.query, academicDepartmentFilterableField);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await AcademicDepartmentService.getAllDepartment(filters, paginationOptions);
        res.status(200).json({
            success: true,
            message: "Academic Departments retrieved successfully",
            meta:  result.meta,
            data:  result.data,
        })
    }catch(error){
        next(error)
    }
}

const getParticularDepartment:RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
    try{
    const {id} = req.params; 
    const result = await AcademicDepartmentService.getParticularDepartment(id);
    res.status(200).json({
        success: true,
        message: 'Particular Department retrieved successfully',
        data: result
    })
    }catch(error){
        next(error)
    }
}

const deleteParticularDepartment:RequestHandler = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params;
        const result = await AcademicDepartmentService.deleteParticularDepartment(id);
        res.status(200).json({
            success: true,
            message: 'Department is deleted successfully',
            data: result
        })
    }catch(error){
        next(error)
    }
}

const updateDepartment:RequestHandler = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params;
        const updatedData = req.body;
        const result = await AcademicDepartmentService.updateDepartment(id, updatedData);
        res.status(200).json({
            success: true,
            message: 'Department is updated successfully',
            data: result
        })
    }catch(error){
        next(error)
    }
}

export const AcademicDepartmentController = {
    createDepartment,
    getAllAcademicDepartment,
    getParticularDepartment,
    deleteParticularDepartment,
    updateDepartment
}
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helper/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicSemesterFilters } from "../academicSemester/academicSemester.interface";
import { academicDepartmentSearchAbleFields } from "./academicDepertment.constants";
import { IAcademicDepartment } from "./academicDepertment.interface";
import { AcademicDepartment } from "./academicDepertment.model"

const createDepartment = async (payload: IAcademicDepartment):Promise<IAcademicDepartment> =>{
    const result = (await AcademicDepartment.create(payload)).populate('academicFaculty');
    return result;
}

const getAllDepartment = async (filters:IAcademicSemesterFilters, paginationOptions: IPaginationOptions):Promise<IGenericResponse<IAcademicDepartment[]>> =>{
    const {searchTerm, ...filtersData} = filters;
    const {page, limit, skip, sortBy, sortOrder} = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = []; 
    if(searchTerm){
        andConditions.push({
            $or:academicDepartmentSearchAbleFields.map(field => ({
                [field]:{
                    $regex: searchTerm,
                    $options: 'i',
                }
            }))
        })
    }

    if(Object.keys(filtersData).length){
        andConditions.push({
            $and:Object.entries(filtersData).map(([field, value])=>({
                [field]:value,
            })),
        });
    }

    const sortConditions:{[key: string]: SortOrder} = {}; 

    if(sortBy && sortOrder){
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length>0 ? {$and: andConditions} : {};
    const result = await AcademicDepartment.find(whereConditions).populate('academicFaculty').sort(sortConditions).skip(skip).limit(limit); 
    const total = await AcademicDepartment.countDocuments();

    return {
        meta: {
            page, limit, total
        },
        data: result
    }
}

const getParticularDepartment = async(id:string) =>{
    const result = (await AcademicDepartment.findById(id))?.populate('academicFaculty');
    return result;
}

const deleteParticularDepartment = (id: string) =>{
    const result = AcademicDepartment.findByIdAndDelete(id);
    return result;
}

const updateDepartment = async (id:string, payload: IAcademicDepartment) =>{
    const result = await AcademicDepartment.findOneAndUpdate({_id: id}, payload, {new: true}).populate('academicFaculty')
    return result;
}

export const AcademicDepartmentService={
    createDepartment,
    getAllDepartment,
    getParticularDepartment,
    deleteParticularDepartment,
    updateDepartment
}
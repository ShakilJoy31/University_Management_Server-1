import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helper/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicFacultySearchAbleFields } from "./academicFaculty.constants";
import { IAcademicFaculty, IAcademicFacultyFilters } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createFaculty = async (payload:IAcademicFaculty):Promise<IAcademicFaculty> =>{
    const result = AcademicFaculty.create(payload);
    return result;
}

const getAllFaculty = async (
    filters:IAcademicFacultyFilters, paginationOptions:IPaginationOptions
):Promise<IGenericResponse<IAcademicFaculty[]>> =>{
    const {searchTerm, ...filtersData} = filters;
    const {page, limit, skip, sortBy, sortOrder} = paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = []; 

    if(searchTerm){
        andConditions.push({
            $or: academicFacultySearchAbleFields.map(field => ({
                [field] : {
                    $regex: searchTerm,
                    $options: 'i',
                }
            })),
        });
    }

    if(Object.keys(filtersData).length){
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const sortConditions:{[key: string]: SortOrder } = {}; 

    if(sortBy && sortOrder){
        sortConditions[sortBy] = sortOrder;
    }
    const whrereConditions = andConditions.length > 0 ? {$and: andConditions} : {}; 
    const result = await AcademicFaculty.find(whrereConditions).sort(sortConditions).skip(skip).limit(limit);
    const total = await AcademicFaculty.countDocuments();

    return {
        meta: {
            page, limit, total
        },
        data: result
    }

}

const updatedFaculty = async (id: string, payload: Partial<IAcademicFaculty>) =>{
    const result = await AcademicFaculty.findOneAndUpdate({_id: id}, payload, {new: true})
    return result
}

const getParticularFaculty = async (id: string) =>{
    const result = await AcademicFaculty.findById(id); 
    return result;
}

const deleteFaculty = async (id: string) =>{
    const result = await AcademicFaculty.findByIdAndDelete(id);
    return result;
}


export const AcademicFacultyService = {
    createFaculty,
    getAllFaculty,
    updatedFaculty,
    getParticularFaculty,
    deleteFaculty
}
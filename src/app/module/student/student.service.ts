import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helper/paginationHelper";
import { SortOrder } from "mongoose";
import { IStudent, IStudentFilters } from "./student.interface";
import { studentSearchAbleFields } from "./student.constants";
import { Student } from "./student.model";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

const getAllStudents = async (filters:IStudentFilters,paginationOption: IPaginationOptions):Promise<IGenericResponse<IStudent[]>> =>{
    const {searchTerm, ...filtersData} = filters;
    const andConditions = [];
    if(searchTerm){
        andConditions.push({
            $or: studentSearchAbleFields.map(field => ({
                [field]:{
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if(Object.keys(filtersData).length){
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value])=>({
                [field]: value,
            }))
        })
    }

    const {page, limit, skip, sortBy, sortOrder} = paginationHelpers.calculatePagination(paginationOption);
    const sortConditions:{[key: string]:SortOrder} = {}
    if(sortBy && sortOrder){
        sortConditions[sortBy] =  sortOrder
    }
    const whereConditions = andConditions.length > 0 ? {$and: andConditions} : {}
    const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort(sortConditions).skip(skip).limit(limit);
    const total = await Student.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

// Function for getting a single semester
const getSingleStudent = async (id:string):Promise<IStudent | null> =>{
    const result = await Student.findById(id).populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment'); 
    return result; 
}

const updateStudent = async (id:string, payload: Partial<IStudent>) => {

    const isExists = Student.findOne({id});
    if(!isExists){
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    const {name, guardian, localGuardian, ...studentData} = payload;

    const updateStudentData: Partial<IStudent> = {...studentData}

    if(name && Object.keys(name).length > 0){
        Object.keys(name).forEach((key)=>{
            const nameKey = `name.${key}` as keyof Partial<IStudent>;
            (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
        })
    }

    // Guardian
    if(guardian && Object.keys(guardian).length > 0){
        Object.keys(guardian).forEach((key)=>{
            const guardianKey = `guardian.${key}` as keyof Partial<IStudent>;
            (updateStudentData as any)[guardianKey] = guardian[key as keyof typeof name];
        })
    }


    // Local Guardian
    if(localGuardian && Object.keys(localGuardian).length > 0){
        Object.keys(localGuardian).forEach((key)=>{
            const localGuardianKey = `localGuardian.${key}` as keyof Partial<IStudent>;
            (updateStudentData as any)[localGuardianKey] = localGuardian[key as keyof typeof localGuardian];
        })
    }
    const result = await Student.findOneAndUpdate({id}, updateStudentData, {new: true})
    return result;
}

const deleteStudent = async (id:string) =>{
    const result = await Student.findByIdAndDelete(id).populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment');
    return result;
}

// Exporting the functions here.
export const StudentService = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent
}
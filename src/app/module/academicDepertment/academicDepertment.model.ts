import { Schema, model } from "mongoose";
import { IAcademicDepartment } from "./academicDepertment.interface";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.interface";

const AcademicDepartmentSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    }
})

export const AcademicDepartment = model<IAcademicDepartment, AcademicFacultyModel>('AcademicDepartment', AcademicDepartmentSchema)
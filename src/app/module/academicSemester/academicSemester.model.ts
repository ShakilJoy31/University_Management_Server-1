import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import { academicSemesterCode, academicSemesterMonths, academicSemesterTitle } from './academicSemester.constants';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

export const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    // Automatic give the field called createdAt and updatedAt
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next){
  const isExists = await AcademicSemester.findOne({
    title: this.title,
    year: this.year
  });
  if(isExists){
    throw new ApiError(httpStatus.CONFLICT, 'Academic semester is already exists !')
  }
  next();
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);

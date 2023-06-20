import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import pick from '../shared/pick';

const createSemester: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllSemesters: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paginationOption = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);
    // console.log(paginationOption);
    const result = await AcademicSemesterService.getAllSemesters(
      paginationOption
    );
    res.status(200).json({
      success: true,
      message: 'Semester retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};

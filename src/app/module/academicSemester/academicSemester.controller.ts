import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import pick from '../shared/pick';
import { academicSemesterFilterableFields } from './academicSemester.constants';
// import httpStatus from 'http-status';

// Creating a new semester here.
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


// Getting all the semester here.
const getAllSemesters: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOption = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);
    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOption
    );
    res.status(200).json({
      success: true,
      message: 'Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

// Getting single semester.
const getSingleSemester = async (req:Request, res:Response, next:NextFunction) =>{
  try{
    const id = req.params.id;
const result = await AcademicSemesterService.getSingleSemester(id);
res.status(200).json({
  success: true,
  message: 'Particular Semester retrieved successfully',
  data: result
});
  }catch(error){
    next(error); 
  }
}

const updateSemester = async (req: Request, res:Response, next: NextFunction) =>{
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicSemesterService.updateSemester(id, updatedData);

    res.status(200).json({
      success: true,
      message: 'Semester is updated successfully',
      data: result
    });
  }catch(error){
    next(error);
  }
}

const deleteSemester = async (req:Request, res:Response, next:NextFunction) =>{
  try{
    const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(id);
  res.status(200).json({
    success: true,
    message: 'Semester deleted successfully',
    data: result
  });
  }catch(error){
    next(error);
  }

}

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester
};

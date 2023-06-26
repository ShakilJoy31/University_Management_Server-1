import { NextFunction, Request, RequestHandler, Response } from 'express';
import pick from '../shared/pick';
import { studentFilterableFields } from './student.constants';
import { StudentService } from './student.service';
// import httpStatus from 'http-status';


// Getting all the semester here.
const getAllStudents: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOption = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);
    const result = await StudentService.getAllStudents(
      filters,
      paginationOption
    );
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

// Getting single semester.
const getSingleStudent = async (req:Request, res:Response, next:NextFunction) =>{
  try{
    const id = req.params.id;
const result = await StudentService.getSingleStudent(id);
res.status(200).json({
  success: true,
  message: 'Particular Semester retrieved successfully',
  data: result
});
  }catch(error){
    next(error); 
  }
}

const updateStudent = async (req: Request, res:Response, next: NextFunction) =>{
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const result = await StudentService.updateStudent(id, updatedData);

    res.status(200).json({
      success: true,
      message: 'Student data is updated successfully',
      data: result
    });
  }catch(error){
    next(error);
  }
}

const deleteStudent = async (req:Request, res:Response, next:NextFunction) =>{
  try{
    const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  res.status(200).json({
    success: true,
    message: 'Semester deleted successfully',
    data: result
  });
  }catch(error){
    next(error);
  }

}

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
};

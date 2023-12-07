import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const catchAsync = (fun: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fun(req, res, next)).catch(error => next(error));
  };
};

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const getStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getSingleStudentFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const patchStudent = catchAsync(async (req, res) => {
  const body = req.body;
  await StudentServices.updateStudent(req.params.id, body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student update successfully',
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  await StudentServices.deleteStudentFromDB(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
  });
});

export const StudentControllers = {
  getAllStudents,
  getStudent,
  patchStudent,
  deleteStudent,
};

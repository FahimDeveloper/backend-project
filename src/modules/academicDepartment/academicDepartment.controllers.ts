import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { academicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic faculty is created successfully',
      data: result,
    });
  },
);

const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.getAllAcademicDepatmentsFromDB();
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic departments are retrieved successfully',
      data: result,
    });
  },
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
        req.params.departmentId,
      );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic department is retrieved successfully',
      data: result,
    });
  },
);

const updateSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.updateSingleAcademicDepartmentIntoDB(
        req.params.departmentId,
        req.body,
      );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic department updated successfully',
      data: result,
    });
  },
);

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};

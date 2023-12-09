import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.service';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic faculty is created successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicFacultyServices.getAllAcademicFacultiesFromDB();
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic faculties are retrieved successfully',
      data: result,
    });
  },
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(
      req.params.facultyId,
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic faculty is retrieved successfully',
      data: result,
    });
  },
);

const updateSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicFacultyServices.updateSingleAcademicFacultyInDB(
        req.params.facultyId,
        req.body,
      );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Academic faculty updated successfully',
      data: result,
    });
  },
);

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};

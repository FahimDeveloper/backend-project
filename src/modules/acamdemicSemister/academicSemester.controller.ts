import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Semester created successfully',
      data: result,
    });
  },
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.getAllAcademicSemestersFromDB();
    res.status(httpStatus.OK).json({
      success: true,
      message: 'All Semesters fetched successfully',
      data: result,
    });
  },
);

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
        req.params.semesterId,
      );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Semester fetched successfully',
      data: result,
    });
  },
);

const updateSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { body } = req;
    const result =
      await AcademicSemesterServices.updateSingleAcademicSemesterIntoDB(
        req.params.semesterId,
        body,
      );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Semester updated successfully',
      data: result,
    });
  },
);

export const academicsServiceController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};

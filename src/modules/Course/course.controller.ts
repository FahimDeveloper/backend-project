import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { CourseServices } from './course.services';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getSingleCourseFromDB(req.params.id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.updateCourseIntoDB(
    req.params.id,
    req.body,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.deleteCourseFromDB(req.params.id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Faculty add in course successfully',
      data: result,
    });
  },
);

const removeFacultiesFromCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
      courseId,
      faculties,
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Faculty remove from course successfully',
      data: result,
    });
  },
);

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
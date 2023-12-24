/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Course, CourseFaculty } from './course.model';
import { TCourse, TCourseFaculty } from './course.types';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery?.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateRemainingData = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateRemainingData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'course update failed');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course);
      if (deletedPreRequisites.length > 0) {
        const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: { course: { $in: deletedPreRequisites } },
            },
          },
          { new: true, runValidators: true, session },
        );
        if (!deletedPreRequisitesCourses) {
          throw new AppError(httpStatus.BAD_REQUEST, 'course update failed');
        }
      }
      const newPreRequisites = preRequisiteCourses.filter(
        el => el.course && !el.isDeleted,
      );
      if (newPreRequisites.length > 0) {
        const newPreRequisitesCourses = await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
          },
          { new: true, runValidators: true, session },
        );
        if (!newPreRequisitesCourses) {
          throw new AppError(httpStatus.BAD_REQUEST, 'course update failed');
        }
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(error.statusCode, error.message);
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  faculties: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: faculties } } },
    { upsert: true, new: true },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  faculties: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: faculties } } },
    { new: true },
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // let searchTerm = '';
  // if (query.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: ['email', 'name.firstName'].map(field => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // //filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];
  // excludeFields.forEach(element => delete queryObj[element]);
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academic_faculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // let limit = 1;
  // if (query?.limit) {
  //   limit = query.limit as number;
  // }

  // let page = 1;
  // let skip = 1;
  // if (query?.page) {
  //   page = query.page as number;
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__v';
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academic_faculty',
        },
      }),
    query,
  ).search(['email', 'name.firstName']);
  const result = await studentQuery?.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academic_faculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  await Student.isIdUserExist(id);
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { session },
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const userId = deleteStudent.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(err.statusCode, err.message);
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};

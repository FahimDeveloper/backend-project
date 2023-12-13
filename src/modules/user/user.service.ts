/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../utils/AppError';
import { TAcademicSemester } from '../acamdemicSemister/academicSemester.interface';
import { AcademicSemesterModel } from '../acamdemicSemister/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TNewUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
import mongoose from 'mongoose';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';

const createStudentIntoDB = async (password: any, payload: TStudent) => {
  const studentModel = new Student();
  await studentModel.isEmailUserExist(payload.email);
  const academicDepartmentModel = new AcademicDepartmentModel();
  await academicDepartmentModel.isAcademicDepartmentExist(
    String(payload.academicDepartment),
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // find academic semester info
    const admissionSemester =
      await AcademicSemesterModel.isAcademicSemesterExist(
        payload.admissionSemester,
      );

    if (!admissionSemester) {
      throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
    }

    //create a user object
    const userData: TNewUser = {
      id: await generatedStudentId(admissionSemester as TAcademicSemester),
      password: password || (config.default_password as string),
      role: 'student',
    };

    //create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(err.statusCode, err.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
};

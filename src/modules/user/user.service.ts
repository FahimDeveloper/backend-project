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
import {
  generatedAdminId,
  generatedFacultyId,
  generatedStudentId,
} from './user.utils';
import mongoose from 'mongoose';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { IFaculty } from '../faculties/faculty.types';
import { FacultyModel } from '../faculties/faculty.model';
import { IAdmin } from '../admin/admin.types';
import { AdminModel } from '../admin/admin.model';

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

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
  const session = await mongoose.startSession();
  await AcademicFacultyModel.isAcademicFacultyExist(payload.academicFaculty);
  const academicDepartmentModel = new AcademicDepartmentModel();
  await academicDepartmentModel.isAcademicDepartmentExist(
    String(payload.academicDepartment),
  );
  try {
    session.startTransaction();
    //create a user object
    const userData: TNewUser = {
      id: await generatedFacultyId(),
      password: password || (config.default_password as string),
      role: 'admin',
    };

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await FacultyModel.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(error.statusCode, error.message);
  }
};

const createAdminIntoDB = async (password: string, payload: IAdmin) => {
  const session = await mongoose.startSession();
  const academicDepartmentModel = new AcademicDepartmentModel();
  await academicDepartmentModel.isAcademicDepartmentExist(
    String(payload.academicDepartment),
  );
  try {
    session.startTransaction();
    //create a user object
    const userData: TNewUser = {
      id: await generatedAdminId(),
      password: password || (config.default_password as string),
      role: 'admin',
    };

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await AdminModel.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(error.statusCode, error.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};

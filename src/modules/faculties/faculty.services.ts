/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { FacultyModel } from './faculty.model';
import { IFaculty } from './faculty.types';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const createFacultyIntoDB = async (payload: IFaculty) => {
  const result = await FacultyModel.create(payload);
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<IFaculty>) => {
  const result = await FacultyModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await FacultyModel.find();
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await FacultyModel.findById(id);
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await FacultyModel.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true },
    );
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }
    const userId = result.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDelete: true },
      { new: true },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }
    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(error.statusCode, error.message);
  }
};

export const facultyServices = {
  createFacultyIntoDB,
  updateFacultyIntoDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
};

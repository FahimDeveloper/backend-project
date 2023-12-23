/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { AdminModel } from './admin.model';
import { IAdmin } from './admin.types';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const createAdminIntoDB = async (payload: IAdmin) => {
  const result = await AdminModel.create(payload);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<IAdmin>) => {
  const result = await AdminModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await AdminModel.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModel.findById(id);
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await AdminModel.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true },
    );
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }
    const userId = result.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDelete: true },
      { new: true },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
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

export const adminServices = {
  createAdminIntoDB,
  updateAdminIntoDB,
  getAllFacultiesFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
};

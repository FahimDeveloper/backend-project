/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, Types, model } from 'mongoose';
import {
  TAcademicDepartment,
  TAcademicDepartmentModel,
} from './academicDepartment.interface';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<
  TAcademicDepartment,
  TAcademicDepartmentModel
>(
  {
    name: { type: String, required: true, unique: true },
    academic_faculty: {
      type: Schema.Types.ObjectId,
      ref: 'academic-faculties',
    },
  },
  { timestamps: true },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Department already exists');
  }
  next();
});

academicDepartmentSchema.methods.isAcademicDepartmentExist = async function (
  id: string,
) {
  const result = await AcademicDepartmentModel.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exists');
  }
};

export const AcademicDepartmentModel = model<
  TAcademicDepartment,
  TAcademicDepartmentModel
>('academic-departments', academicDepartmentSchema);

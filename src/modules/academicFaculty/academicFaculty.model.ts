import { Schema, model } from 'mongoose';
import {
  TAcademicFaculty,
  TAcademicFacultyModel,
} from './academicFaculty.interface';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';

const AcademicFacultySchema = new Schema<
  TAcademicFaculty,
  TAcademicFacultyModel
>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

AcademicFacultySchema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFacultyModel.findOne({
    name: this.name,
  });
  if (isFacultyExist) {
    throw new Error('Faculty is already exists');
  }
  next();
});

AcademicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isFacultyExist = await AcademicFacultyModel.findOne(query);
  if (isFacultyExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The Academic Faculty does not exists',
    );
  }
  next();
});

AcademicFacultySchema.statics.isAcademicFacultyExist = async function (id) {
  const result = await AcademicFacultyModel.findById(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The Academic Faculty does not exists',
    );
  }
};

export const AcademicFacultyModel = model<
  TAcademicFaculty,
  TAcademicFacultyModel
>('academic-faculties', AcademicFacultySchema);

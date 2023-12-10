import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
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
    throw new AppError(httpStatus.NOT_FOUND, 'This Faculty does not exists');
  }
  next();
});

export const AcademicFacultyModel = model<TAcademicFaculty>(
  'academic-faculties',
  AcademicFacultySchema,
);

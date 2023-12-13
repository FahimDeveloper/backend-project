import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterModel,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<
  TAcademicSemester,
  TAcademicSemesterModel
>(
  {
    name: { type: String, enum: academicSemesterName, required: true },
    year: { type: String, required: true },
    code: { type: String, enum: academicSemesterCode, required: true },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  { timestamps: true },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExist) {
    throw new Error('Semester already exists');
  }
  next();
});

academicSemesterSchema.statics.isAcademicSemesterExist = async function (
  id: string,
) {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

export const AcademicSemesterModel = model<
  TAcademicSemester,
  TAcademicSemesterModel
>('academic-semesters', academicSemesterSchema);

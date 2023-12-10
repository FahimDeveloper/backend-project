import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { academicSemesterCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // check semester name ---> semester code
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid academic semester code',
    );
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemesterModel.findById(semesterId);
  return result;
};

const updateSingleAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  // check semester name ---> semester code
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid academic semester code',
    );
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(
    semesterId,
    payload,
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterIntoDB,
};

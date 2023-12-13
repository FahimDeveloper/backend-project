import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const findAcademicFaculty = await AcademicFacultyModel.findById(
    payload.academic_faculty,
  );
  if (!findAcademicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'The faculty is not available');
  }
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepatmentsFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academic_faculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const result =
    await AcademicDepartmentModel.findById(departmentId).populate(
      'academic_faculty',
    );
  return result;
};

const updateSingleAcademicDepartmentIntoDB = async (
  departmentId: string,
  payload: TAcademicDepartment,
) => {
  const academicDepartmentModel = new AcademicDepartmentModel();
  await academicDepartmentModel.isAcademicDepartmentExist(departmentId);
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: departmentId },
    payload,
    { new: true },
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepatmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentIntoDB,
};

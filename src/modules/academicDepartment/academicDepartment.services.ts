import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepatmentsFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academic_faculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const result = await AcademicDepartmentModel.findById(departmentId);
  return result;
};

const updateSingleAcademicDepartmentIntoDB = async (
  departmentId: string,
  payload: TAcademicDepartment,
) => {
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

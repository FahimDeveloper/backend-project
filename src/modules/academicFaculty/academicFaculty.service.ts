import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  const result = await AcademicFacultyModel.findById(facultyId);
  return result;
};

const updateSingleAcademicFacultyInDB = async (
  facultyId: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: facultyId },
    payload,
    { new: true },
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyInDB,
};

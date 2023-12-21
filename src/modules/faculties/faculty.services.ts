import { FacultyModel } from './faculty.model';
import { IFaculty } from './faculty.types';

const createFacultyIntoDB = async (payload: IFaculty) => {
  const result = await FacultyModel.create(payload);
  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<IFaculty>) => {
  const result = await FacultyModel.findOneAndUpdate({ id: id }, payload, {
    new: true,
  });
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await FacultyModel.find();
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await FacultyModel.findOne({ id: id });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const result = await FacultyModel.findOneAndUpdate(
    { id: id },
    { isDelete: true },
  );
  return result;
};

export const facultyServices = {
  createFacultyIntoDB,
  updateFacultyIntoDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
};

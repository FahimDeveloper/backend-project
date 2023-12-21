import { AdminModel } from './admin.model';
import { IAdmin } from './admin.types';

const createAdminIntoDB = async (payload: IAdmin) => {
  const result = await AdminModel.create(payload);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<IAdmin>) => {
  const result = await AdminModel.findOneAndUpdate({ id: id }, payload, {
    new: true,
  });
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await AdminModel.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModel.findOne({ id: id });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const result = await AdminModel.findOneAndUpdate(
    { id: id },
    { isDelete: true },
  );
  return result;
};

export const adminServices = {
  createAdminIntoDB,
  updateAdminIntoDB,
  getAllFacultiesFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
};

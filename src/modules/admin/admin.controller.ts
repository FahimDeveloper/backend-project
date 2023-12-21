import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { adminServices } from './admin.services';

const createAdmin = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await adminServices.createAdminIntoDB(data);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.facultyId;
  const result = await adminServices.updateAdminIntoDB(id, data);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await adminServices.getAllFacultiesFromDB();
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties fetched successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const result = await adminServices.getSingleAdminFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  await adminServices.deleteAdminFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Admin deleted successfully',
  });
});

export const adminController = {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
};

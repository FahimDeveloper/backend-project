import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { facultyServices } from './faculty.services';

const createFaculty = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await facultyServices.createFacultyIntoDB(data);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await facultyServices.updateFacultyIntoDB(id, data);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB();
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties fetched successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await facultyServices.getSingleFacultyFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  await facultyServices.deleteFacultyFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculty deleted successfully',
  });
});

export const facultyController = {
  createFaculty,
  updateFaculty,
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
};

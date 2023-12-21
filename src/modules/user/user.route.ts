import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { CreateFacultySchemaValidation } from '../faculties/faculty.validation';
import { CreateAdminSchemaValidation } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequestHandler(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequestHandler(CreateFacultySchemaValidation),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequestHandler(CreateAdminSchemaValidation),
  userController.createAdmin,
);
export const UserRoutes = router;

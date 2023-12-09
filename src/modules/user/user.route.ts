import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequestHandler from '../../middleware/validateRequestHandler';

const router = express.Router();

router.post(
  '/create-student',
  validateRequestHandler(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);

export const UserRoutes = router;

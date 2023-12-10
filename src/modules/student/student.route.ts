import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { studentValidations } from './student.validation';

const router = express.Router();
// server request
router.get('/all', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getStudent);
router.patch(
  '/update/:id',
  validateRequestHandler(studentValidations.updateStudentValidationSchema),
  StudentControllers.patchStudent,
);
router.delete('/delete/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;

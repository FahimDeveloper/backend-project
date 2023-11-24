import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();
// server request
router.post('/create-student', StudentControllers.createStudent);
router.get('/all', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getStudent);
router.patch('/update/:id', StudentControllers.patchStudent);

export const StudentRoutes = router;

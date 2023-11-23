import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();
// server request
router.post('/create-student', StudentControllers.createStudent);
router.get('/all', StudentControllers.getAllStudents);

export const StudentRoutes = router;

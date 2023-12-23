import express from 'express';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { facultyController } from './faculty.controller';
import { CreateFacultySchemaValidation } from './faculty.validation';

const router = express.Router();

router.get('/', facultyController.getAllFaculties);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/update/:id',
  validateRequestHandler(CreateFacultySchemaValidation),
  facultyController.updateFaculty,
);
router.delete('/delete/:id', facultyController.deleteFaculty);

export const facutyRoutes = router;

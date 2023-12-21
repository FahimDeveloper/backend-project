import express from 'express';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { facultyController } from './faculty.controller';
import { CreateFacultySchemaValidation } from './faculty.validation';

const router = express.Router();

router.get('/', facultyController.getAllFaculties);
router.get('/:facultyId', facultyController.getSingleFaculty);
router.patch(
  '/update/:facultyId',
  validateRequestHandler(CreateFacultySchemaValidation),
  facultyController.updateFaculty,
);
router.delete('/delete/:facultyId', facultyController.deleteFaculty);

export const facutyRoutes = router;

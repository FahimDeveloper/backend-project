import express from 'express';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { academicFacultyValidations } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequestHandler(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get('/', academicFacultyControllers.getAllAcademicFaculties);
router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/update/:facultyId',
  validateRequestHandler(
    academicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateSingleAcademicFaculty,
);

export const academicFacultyRoutes = router;

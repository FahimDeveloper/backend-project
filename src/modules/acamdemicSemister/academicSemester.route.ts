import express from 'express';
import { academicsServiceController } from './academicSemester.controller';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequestHandler(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicsServiceController.createAcademicSemester,
);
router.get('/', academicsServiceController.getAllAcademicSemesters);
router.get(
  '/:semesterId',
  academicsServiceController.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  validateRequestHandler(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicsServiceController.updateSingleAcademicSemester,
);

export const academicSemesterRoutes = router;

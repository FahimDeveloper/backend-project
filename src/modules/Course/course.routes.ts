import express from 'express';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { courseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequestHandler(courseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.patch(
  '/update/:id',
  validateRequestHandler(courseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  validateRequestHandler(courseValidation.FacultyWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequestHandler(courseValidation.FacultyWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete('/delete/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;

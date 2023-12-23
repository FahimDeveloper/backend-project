import express from 'express';
import validateRequestHandler from '../../middleware/validateRequestHandler';
import { adminController } from './admin.controller';
import { CreateAdminSchemaValidation } from './admin.validation';

const router = express.Router();

router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getSingleAdmin);
router.patch(
  '/update/:id',
  validateRequestHandler(CreateAdminSchemaValidation),
  adminController.updateAdmin,
);
router.delete('/delete/:id', adminController.deleteAdmin);

export const adminRoutes = router;

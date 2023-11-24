import Joi from 'joi';

const studentSchema = Joi.object({
  id: Joi.string(),
  name: Joi.object({
    firstName: Joi.string().max(5).required().messages({
      'any.required': 'First name is required',
      'string.max': 'name length more then 5 cheracter',
    }),
    middleName: Joi.string().required().messages({
      'any.required': 'Middle name is required',
    }),
    lastName: Joi.string().required().messages({
      'any.required': 'Last name is required',
    }),
  })
    .required()
    .messages({
      'any.required': 'Name is required',
    }),

  gender: Joi.string().valid('male', 'female').required().messages({
    'any.required': 'Gender is required',
    'any.only': 'Gender must be either "male" or "female"',
  }),

  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Please provide a valid email address',
  }),

  dateOfBirth: Joi.string(),
  contactNumber: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),

  emergencyContactNumber: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),

  bloodGroup: Joi.string(),

  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),

  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),

  guardian: Joi.object({
    fatherName: Joi.string().required().messages({
      'any.required': "Father's name is required",
    }),
    fatherOccupation: Joi.string().required().messages({
      'any.required': "Father's occupation is required",
    }),
    fatherContactNumber: Joi.string().required().messages({
      'any.required': "Father's contact number is required",
    }),
    motherName: Joi.string().required().messages({
      'any.required': "Mother's name is required",
    }),
    motherOccupation: Joi.string().required().messages({
      'any.required': "Mother's occupation is required",
    }),
    motherContactNumber: Joi.string().required().messages({
      'any.required': "Mother's contact number is required",
    }),
  })
    .required()
    .messages({
      'any.required': 'Guardian information is required',
    }),

  profileImage: Joi.string().required().messages({
    'any.required': 'Profile image is required',
  }),

  isActive: Joi.boolean().required().messages({
    'any.required': 'isActive status is required',
  }),
});

export default studentSchema;

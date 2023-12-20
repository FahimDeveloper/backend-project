/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorSource } from '../types/errorSources.types';
import { handleZodError } from '../errors/handleZodError';
import handleMongooseValidationError from '../errors/handleMongooseValidationError';
import handleMongooseCastError from '../errors/handleMongooseCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../utils/AppError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || httpStatus.BAD_REQUEST;
  let message = error?.message;
  let errorSources: TErrorSource = [
    {
      path: '',
      message: '',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleMongooseValidationError(error);
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'CatsError') {
    const simplifiedError = handleMongooseCastError(error);
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error instanceof AppError) {
    message = error?.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;

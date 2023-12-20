import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../types/errorResponse.types';

export const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    message: 'validation error',
    errorSources,
  };
};

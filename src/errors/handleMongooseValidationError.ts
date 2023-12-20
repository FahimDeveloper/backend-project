import mongoose from 'mongoose';
import { TErrorSource } from '../types/errorSources.types';
import { TGenericErrorResponse } from '../types/errorResponse.types';

const handleMongooseValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    },
  );
  return {
    message: 'validation error',
    errorSources,
  };
};

export default handleMongooseValidationError;

import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../types/errorResponse.types';
import { TErrorSource } from '../types/errorSources.types';

const handleMongooseCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  return {
    message: 'Invalid id',
    errorSources,
  };
};

export default handleMongooseCastError;

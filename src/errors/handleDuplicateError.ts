/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from '../types/errorResponse.types';
import { TErrorSource } from '../types/errorSources.types';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: Object.keys(err.keyValue)[0],
      message: `${extractedMessage} is already exist`,
    },
  ];
  return {
    message: 'Duplicate error',
    errorSources,
  };
};

export default handleDuplicateError;

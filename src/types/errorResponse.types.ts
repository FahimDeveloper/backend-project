import { TErrorSource } from './errorSources.types';

export type TGenericErrorResponse = {
  message: string;
  errorSources: TErrorSource;
};

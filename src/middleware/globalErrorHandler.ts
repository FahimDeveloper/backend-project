/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = 400;
  const message = error?.issues ? error.issues[0].message : error?.message;
  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
};

export default globalErrorHandler;

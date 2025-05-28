import { Response } from 'express';
import { CustomError } from '../../../../domain/errors';


export const handleError = (error: unknown, res: Response): void => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
};

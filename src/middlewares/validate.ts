import { Request, Response, NextFunction } from 'express';

import * as validator from '@/lib/validator';

export function schema(validationSchema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    return validator
      .validate(req.body, validationSchema)
      .then(() => next())
      .catch((err) => next(err));
  };
}

import { Request, Response, NextFunction } from 'express';

interface MiddlewareHandlerParams {
  req: Request;
  res: Response;
  next: NextFunction;
}


export default MiddlewareHandlerParams;

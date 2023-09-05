import { Response, NextFunction } from 'express';
import ExpressRequest from 'Interfaces/Kernel/ExpressRequest';

interface MiddlewareHandlerParams {
  req: ExpressRequest;
  res: Response;
  next: NextFunction;
}


export default MiddlewareHandlerParams;

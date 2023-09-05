import { Response } from 'express';
import ExpressRequest from 'Interfaces/Kernel/ExpressRequest';

interface RouteHandlerParams {
  req: ExpressRequest;
  res: Response;
  // next: NextFunction;
}

export default RouteHandlerParams;

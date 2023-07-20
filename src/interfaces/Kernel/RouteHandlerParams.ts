import { Request, Response } from 'express';

interface RouteHandlerParams {
  req: Request;
  res: Response;
  // next: NextFunction;
}

export default RouteHandlerParams;

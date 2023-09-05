import { Request } from 'express';


interface ExpressRequest extends Request {
  user?: Record<string, any>;
}

export default ExpressRequest;

import Method from 'Interfaces/Kernel/Method';
import RouteHandler from 'Interfaces/Kernel/RouteHandler';
import MiddlewareHandler from 'Interfaces/Kernel/MiddlewareHandler';

export default interface Route {
  path: string;
  method: Method;
  handler: RouteHandler | string;
  middlewares: (MiddlewareHandler | string)[];
}

import MiddlewareHandler from 'Interfaces/Kernel/MiddlewareHandler';

abstract class Middleware {
  abstract handle: MiddlewareHandler;
}

export default Middleware;

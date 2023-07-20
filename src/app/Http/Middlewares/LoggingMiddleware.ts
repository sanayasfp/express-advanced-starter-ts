import Middleware from 'Interfaces/Kernel/Middleware';
import MiddlewareHandlerParams from 'Interfaces/Kernel/MiddlewareHandlerParams';

class LoggingMiddleware implements Middleware {
  public handle({ req, next }: MiddlewareHandlerParams): void {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  }
}

export default LoggingMiddleware;

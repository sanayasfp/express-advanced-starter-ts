import MiddlewareHandler from 'Interfaces/Kernel/MiddlewareHandler';

// interface Middleware {
//   // new(): {
//   handle: MiddlewareHandler
//   // };
//   // new(): Middleware;
// }

abstract class Middleware implements Middleware {
  abstract handle: MiddlewareHandler;
}

export default Middleware;

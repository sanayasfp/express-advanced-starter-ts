import express, { NextFunction, Request, Response } from 'express';
import { join } from 'path';

import Method from 'Interfaces/Kernel/Method';
import Route from 'Interfaces/Kernel/Route';
import RouteHandler from 'Interfaces/Kernel/RouteHandler';
import MiddlewareHandler from 'Interfaces/Kernel/MiddlewareHandler';
import Controller from 'App/Http/Controllers/Kernel';
import MiddlewareHandlerParams from 'Interfaces/Kernel/MiddlewareHandlerParams';

class Router {
  private routes: Route[] = [];

  public static create(): Router {
    return new Router();
  }

  public static post(path: string, handler: RouteHandler | string): Router {
    return Router.create().post(path, handler);
  }

  public static get(path: string, handler: RouteHandler | string): Router {
    return Router.create().get(path, handler);
  }

  public static put(path: string, handler: RouteHandler | string): Router {
    return Router.create().put(path, handler);
  }

  public static patch(path: string, handler: RouteHandler | string): Router {
    return Router.create().patch(path, handler);
  }

  public static delete(path: string, handler: RouteHandler | string): Router {
    return Router.create().delete(path, handler);
  }

  public post(path: string, handler: RouteHandler | string): Router {
    this.addRoute('post', path.trim(), handler);
    return this;
  }

  public get(path: string, handler: RouteHandler | string): Router {
    this.addRoute('get', path.trim(), handler);
    return this;
  }

  public put(path: string, handler: RouteHandler | string): Router {
    this.addRoute('put', path.trim(), handler);
    return this;
  }

  public patch(path: string, handler: RouteHandler | string): Router {
    this.addRoute('patch', path.trim(), handler);
    return this;
  }

  public delete(path: string, handler: RouteHandler | string): Router {
    this.addRoute('delete', path.trim(), handler);
    return this;
  }

  public middleware(middlewares: Route['middlewares']): Router {
    const currentRoute = this.getCurrentRoute();
    if (currentRoute) {
      currentRoute.middlewares.push(...middlewares);
    }
    return this;
  }

  // Usage example
  // router.batchMiddlewares([liste des middlewares qui sont ajouter aux memes routes])([
  //   router.get('path', 'PostController.index'),
  //   router.get('/path', 'PostController.show')
  //     .middleware([middleware1, middleware2]),
  // ])

  public batchMiddlewares(middlewares: Route['middlewares']) {
    const nextRouteIndex = this.routes.length;

    return (routes: Router[]) => {
      let routeIndex = nextRouteIndex;

      routes.forEach((router) => {
        router.routes[routeIndex].middlewares = [...middlewares, ...router.routes[routeIndex].middlewares];
        routeIndex++;
      });

      return routes[routeIndex];
    };
  }

  public use(path: string, handler: RouteHandler | string): Router {
    this.addRoute('use', path, handler);
    return this;
  }

  public getRouter(): express.Router {
    const router = express.Router();
    this.routes.forEach((route) => {
      const { method, path, handler, middlewares } = route;
      const routeMiddlewares = middlewares.map((middleware) =>
        async (req: Request, res: Response, next: NextFunction) => {
          await this.handlerCaller({ req, res, next }, this.resolveHandler(middleware, 'Middlewares'), 'Middleware');
        },
      );
      router[method](path, ...routeMiddlewares, async (req: Request, res: Response, next: NextFunction) => {
        await this.handlerCaller({ req, res, next }, this.resolveHandler(handler));
      });
    });
    return router;
  }

  private async handlerCaller(ctx: MiddlewareHandlerParams, resolver: ReturnType<Router['resolveHandler']>, handlerType: 'Controller' | 'Middleware' = 'Controller') {
    let result;
    const { controllerMethod, controllerClass } = resolver;
    const controller = new controllerClass(ctx);

    if (typeof controllerMethod === 'string') {
      const handler = (controller as any)[controllerMethod].bind(controller);
      result = await handler(ctx);
    } else [result] = await Promise.all([controllerMethod(ctx)]);

    if (!ctx.res.headersSent && !(!result && handlerType === 'Middleware')) ctx.res.send(controller.responseBuilder(result));
  }

  private addRoute(method: Method, path: string, handler: RouteHandler | string): void {
    const route: Route = {
      path,
      method,
      handler,
      middlewares: [],
    };
    this.routes.push(route);
  }

  private getCurrentRoute(): Route | undefined {
    return this.routes[this.routes.length - 1];
  }

  private resolveHandler(
    handler: MiddlewareHandler | string,
    dir: 'Controllers' | 'Middlewares' = 'Controllers',
  ) {
    handler = dir === 'Middlewares' && typeof handler === 'string' ? `${handler}.handle` : handler;
    let ControllerClass: typeof Controller = Controller;

    if (typeof handler === 'string') {
      const [controllerName, methodName] = handler.split('.');
      ControllerClass = require(join(
        __dirname,
        '..',
        'Http',
        dir,
        controllerName,
      )).default;
      handler = methodName;
    }
    return { controllerMethod: handler, controllerClass: ControllerClass };
  }
}



const Route = Router.create() as Exclude<Router, 'middleware'>;

export default Route;


// TODO: UPGRADE IN STARTER

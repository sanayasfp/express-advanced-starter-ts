import OtherController from 'App/Http/Controllers/OtherController';
import Test from 'App/Http/Controllers/TestController';
import LoggingMiddleware from 'App/Http/Middlewares/LoggingMiddleware';
import Route from 'Routes/Kernel';

export default Route;

Route.get('/test', Test.handler(Test, 'index'))
  .middleware([LoggingMiddleware.name]);

Route.post('/test', 'TestController.create')
  .middleware([LoggingMiddleware.name]);

Route.batchMiddlewares([({ next }) => {
  console.log('Batch Middleware');
  return next();
}])([
  Route.get('/test/hello', () => 'hello'),
  Route.post('/test/void', () => { return; }),
  Route.post('/other', `${OtherController.name}.create`),
  Route.delete('/other/:id', OtherController.handler(OtherController, 'delete')),
]);

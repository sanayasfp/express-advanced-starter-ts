import Controller from 'App/Http/Controllers/Kernel';
import RouteHandlerParams from 'Interfaces/Kernel/RouteHandlerParams';

class Test extends Controller {
  static moduleName = 'TestController';

  index() {
    return {
      hello: 'world',
    };
  }

  create({ res }: RouteHandlerParams) {
    res.status(400);
    return {
      test: 'create',
    };
  }

  update({ res }: RouteHandlerParams) {
    res.send('Raw Response');
  }
}

export default Test;

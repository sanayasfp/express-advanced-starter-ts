import Controller from 'App/Http/Controllers/Kernel';
import RouteHandlerParams from 'Interfaces/Kernel/RouteHandlerParams';

class OtherController extends Controller {
  static moduleName = OtherController.name; // Assumes we have the same name with the module file name

  index() {
    return {
      hello: 'other world',
    };
  }

  create() {
    return {
      other: 'create',
      statusCode: 400,
    };
  }

  delete({ res, req }: RouteHandlerParams) {
    res.send({
      other: 'delete ' + req.params.id,
    });
  }
}

export default OtherController;

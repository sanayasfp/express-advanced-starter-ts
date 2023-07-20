import Response from 'Interfaces/Kernel/Response';
import RouteHandlerParams from 'Interfaces/Kernel/RouteHandlerParams';
import * as httpStatus from 'http-status-codes';

class Controller {
  static moduleName = 'Controllers';

  static handler(c: typeof Controller, name: string) {
    return `${c.moduleName}.${name}`;
  }

  static responseBuilder(ctx: Partial<RouteHandlerParams>, res: string | number | Partial<Response> = {}) {
    if (typeof res === 'string' || typeof res === 'number') res = { message: String(res) } as Response;

    const statusCode = res.statusCode || ctx.res?.statusCode || 200;
    ctx.res?.status(statusCode);

    res.data = Array.isArray(res.data)
      ? res.data
      : typeof res.data === 'object' && res.data !== null && Object.keys(res.data).length > 0
        ? [res]
        : [];

    res.errors = Array.isArray(res.errors)
      ? res.errors
      : typeof res.errors === 'object' && res.errors !== null && Object.keys(res.errors).length > 0
        ? [res]
        : [];

    res.errors = Array.isArray((res as any).error)
      ? (res as any).error
      : typeof (res as any).error === 'object' && (res as any).error !== null && Object.keys((res as any).error).length > 0
        ? [res]
        : [];

    const o: Response = {
      ...(res || {}),
      statusCode,
      success: false,
      message: res ? res.message ||
        (typeof (res as any).error === 'string' ? (res as any).error : undefined) ||
        httpStatus.getReasonPhrase(statusCode)
        : httpStatus.getReasonPhrase(statusCode),
      data: res.data || [],
      errors: res.errors || [],
      metaData: res?.metaData || {},
    };

    delete res.statusCode;
    delete res.success;
    delete res.message;
    delete res.data;
    delete res.errors;
    delete res.metaData;

    o.errors = o.errors.length > 0
      ? res.errors : (Array.isArray(res)
        ? res as any
        : typeof res === 'object' && res !== null && Object.keys(res).length > 0
          ? [res]
          : []);

    if (statusCode >= 200 && statusCode < 300) {
      o.success = true;
      o.data = o.data.length > 0
        ? res.data : Array.isArray(res)
          ? res as any
          : typeof res === 'object' && res !== null && Object.keys(res).length > 0
            ? [res]
            : [];
      o.errors = [];
    }
    return o;
  }
}

export default Controller;

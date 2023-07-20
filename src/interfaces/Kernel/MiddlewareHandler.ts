import MiddlewareHandlerParams from 'Interfaces/Kernel/MiddlewareHandlerParams';

type MiddlewareHandler = (ctx: MiddlewareHandlerParams) => void;

export default MiddlewareHandler;

import { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

type InjectableAsyncHandler = (container: Request['container']) => AsyncHandler;

const handler =
  (handler: InjectableAsyncHandler): RequestHandler =>
    (req, res, next) =>
      Promise.resolve(handler(req.container)(req, res, next)).catch(next);

export { handler };

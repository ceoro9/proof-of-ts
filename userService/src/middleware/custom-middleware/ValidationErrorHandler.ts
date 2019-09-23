import * as express from 'express';
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import { logger } from '@app/middleware/common/Logging';
import { ServerErrorResponse } from '@app/service-layer/responses/ErrorResponse';
import Application from '@app/middleware/config/Application';

function isArray<T>(obj: any): obj is Array<T> {
  return Array.isArray(obj);
}

function isError(obj: any): obj is Error {
  return obj instanceof Error;
}

function isString(obj: any): obj is string {
  return typeof obj === "string";
}

/**
 * Express middleware to catch error throwed in
 * controllers Should be first in error chain 
 * as it sends response directly to client.
 */
@Middleware({ type: 'after' })
export default class ValidationErrorHandler implements ExpressErrorMiddlewareInterface {

  public error(error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {

    // Validation Error
    if (isArray(error) && error.every((el) => el instanceof ValidationError)) {
      res.status(400);
      res.json({
        error: {
          code: 400,
          message: `Incorrect request format. Check 'errors' field for more details!`,
          errors: error,
        }
      });
      return;
    }

    // TODO: add NotFound/Authentication/PermissionDenied errors handlers.

    // Server Error
    res.status(500);

    const responseObject: ServerErrorResponse = {
      code: 500,
      message: 'Internal Server Error.',
    };

    if (isString(error)) {
      responseObject.message = error; 
    }

    if (isError(error)) {
      
      logger.error('Server Error', { error });

      if (error.message) {
        responseObject.message = error.message;
      }

      if (error.name && (Application.isDevelopmentEnv() || error.message)) {
        responseObject.name = error.name;
      }
      
      if (error.stack && Application.isDevelopmentEnv()) {
        responseObject.stack = error.stack;
      }

    }

    logger.info('NICE');
    res.json({ error: responseObject });
  }

}
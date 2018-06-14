import {Request, Response, NextFunction} from 'express';

import {requestError} from "../config/error/errors";

const errorHandler = requestError.bind(null, 'alpha');

/**
 * Return an alphanumeric string, or pass on to the global error handler in the event of a failure
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
export function getAlpha(req: Request, res: Response, next: NextFunction) {
  try {
    return res.json({data: 'A0B3HCJ'});
  } catch (err) {
    next(errorHandler(err));
  }
}

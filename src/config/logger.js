import _ from 'lodash';

import Log from '../models/Log';
import {default as ErrorLog} from '../models/ErrorLog';

// Target methods to log
const methods = ['POST', 'DELETE', 'PUT', 'PATCH', 'GET'];

/**
 * Log API problems for debugging
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export default async function logger(req, res, next) {
  const {originalUrl, method, body = {}, params = {}, query = {}} = req;
  const {statusCode, statusMessage} = res;
  const logParams = {path: originalUrl, method, statusCode, statusMessage};
  const optionalTypes = {body, params, query};
  try {
    if (methods.indexOf(req.method) > -1) {
      // Store optionally query, body, params
      _.forEach(optionalTypes, (value, name) => {
        if (Object.keys(value).length) {
          logParams[name] = value;
        }
      });
      if (req.user) {
        logParams.user = req.user;
      }
      logParams.ip = req.ip;
      await Log.create(logParams);
    }
    next();
  } catch (err) {
    await ErrorLog.create({
      message: 'Unable to log error',
      method,
      controller: req.params._dController,
      stack: err.stack,
      body: req.body,
      params: req.params
    });
  }
}

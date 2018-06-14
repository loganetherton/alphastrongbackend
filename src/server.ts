import {message} from "aws-sdk/clients/sns";

require('source-map-support').install();

import * as express from 'express';
import * as dotenv from 'dotenv';

import * as errorHandler from "errorhandler";
import {default as ErrorLog} from './models/ErrorLog';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import {default as config} from './config/environment';
import {IRequestError} from "./config/error/errors";

const app = require("./app");

/**
 * Development error logger
 * @param {IRequestError} err
 * @param {string} str
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
async function errorLogger (err: any, str: string, req: express.Request, res: express.Response) {
  await ErrorLog.create({
    message: err.error.message,
    method: req.method,
    controller: req.params._dController,
    stack: err.error.stack,
    body: req.body,
    params: req.params
  });
}

/**
 * Handle errors in prod
 * @param {IRequestError} err
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<Response>}
 */
async function productionErrorHandler(err: IRequestError, req: express.Request, res: express.Response) {
  await ErrorLog.create({
    message: err.error.message,
    method: req.method,
    controller: req.params._dController,
    stack: err.error.stack,
    body: req.body,
    params: req.params
  });
  return res.json({message: 'Whoops! Something went wrong. Technicians in white coats will arrive shortly.'});
}

/**
 * Error Handler. Provides full stack - remove for production
 */
if (config.env !== 'production') {
  app.use(errorHandler({log: errorLogger}));
} else {
  app.use(productionErrorHandler);
}

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

export = server;
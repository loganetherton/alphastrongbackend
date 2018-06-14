/**
 * Routes
 */
import * as express from 'express';

// Routes
import {default as alpha} from './routes/alpha';

export function routes(app: express.Application) {
  /**
   * Primary app routes.
   */
  app.use('/api/alpha', alpha);
}

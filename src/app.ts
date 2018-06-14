import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import * as cors from 'cors';

import {routes} from './routes';

import {default as config} from './config/environment';

// Create Express server
const app = express();

// Connect to MongoDB
(<any>mongoose).Promise = bluebird;
mongoose.set('debug', config.mongo.debug);
mongoose.connect(config.mongo.uri, {useMongoClient: true});

// Express configuration
app.set('port', config.port || 3000);
app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
routes(app);

module.exports = app;
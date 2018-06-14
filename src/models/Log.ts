'use strict';

import {createIndexes} from '../config/indexDb';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

import * as config from '../config/environment';

console.log('**************CONFIG**********');
console.log(config);

export interface ILog extends mongoose.Document {
  created: Date;
  path: string;
  method: string;
  body: object;
  params: object;
  query: object;
  statusCode: number;
  statusMessage: string;
  isError: boolean;
  user: mongoose.Types.ObjectId;
  ip: string;
}

export interface LogModel extends mongoose.Model<ILog> { }

const Logs = new Schema({
  // When original record is created
  created: {
    type: Date,
    default: Date.now
  },
  // Path requested
  path: String,
  // Request method
  method: String,
  // Request body
  body: Object,
  // Request params
  params: Object,
  // Request query
  query: Object,
  // Response status code
  statusCode: Number,
  // Response status message
  statusMessage: String,
  // Is error log
  isError: {type: Boolean, default: false},
  // User
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  // IP
  ip: String
});

// Indexes
// const indexes = [
//   // Unique card index
//   // [{created: 1}, {expireAfterSeconds: config.twoWeeks}]
// ];
// createIndexes(Logs, indexes);

export const Log: LogModel = mongoose.model<ILog, LogModel>('Log', Logs);

export default Log;

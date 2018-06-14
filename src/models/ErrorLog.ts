'use strict';

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IErrorLog extends mongoose.Document {
  message: String,
  method: String,
  controller: string,
  revision: string,
  stack: mongoose.Types.ObjectId,
  error: any,
  user: mongoose.Types.ObjectId,
  company: mongoose.Types.ObjectId,
  body: Object,
  params: Object,
  created: Date
}

export interface ErrorLogModel extends mongoose.Model<IErrorLog> {}

const ErrorLogSchema = new Schema({
  // Error object message
  message: String,

  method: {
    type: String
  },

  // This is the name of controller where an error occurs.
  controller: {
    type: String
  },

  stack: {
    type: Schema.Types.Mixed
  },

  error: {
    type: Schema.Types.Mixed
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  // Request body
  body: Object,
  // Params
  params: Object,

  created: {
    type: Date,
    default: Date.now
  }

});


export default mongoose.model<IErrorLog, ErrorLogModel>('ErrorLog', ErrorLogSchema);

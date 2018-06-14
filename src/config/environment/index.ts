const path = require('path');
const _ = require('lodash');

export interface Config {
  env: string,
  isStaging: boolean,
  debug: boolean,
  root: string,
  port: number,
  ip: string,
  secrets: {
    session: string
  },
  userRoles: string[],
  mongo: {
    options: {
      db: {
        safe: true
      }
    },
    uri: string,
    debug: boolean
  },
  twoWeeks: number,
  sgToken: string,
  isTest: boolean
}

// Default config
const all = <Config> {
  env: process.env.NODE_ENV,
  isStaging: process.env.IS_STAGING === 'true',
  debug: process.env.DEBUG === 'true',

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET
  },

  // List of user roles
  userRoles: ['user', 'corporate-admin', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    },
    uri: 'mongodb://localhost/alpha'
    debug: process.env.MONGO_DEBUG === 'true'
  },

  // Two weeks in seconds
  twoWeeks: 1209600,

  // Sendgrid API key
  sgToken: 'Not Set',

  isTest: false
};

// Export the config object based on the NODE_ENV
// ==============================================
let combinedConfig: Config = _.merge(
  all,
  require('./' + (process.env.NODE_ENV || 'production') + '.js') || {});
// Staging config
if (combinedConfig.isStaging) {
  combinedConfig = _.merge(combinedConfig, require('./staging.js') || {});
}

export default combinedConfig;

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI
  },

  seedDB: false,

  frontendBaseUrl: 'http://localhost:3000/',
  backendBaseUrl: 'http://localhost:9000/api/',
  serverApiUrl: 'http://localhost:9000/api/'
};

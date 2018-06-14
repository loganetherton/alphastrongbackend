// Production config
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI
  },

  frontendBaseUrl: 'https://getalpha.com/',
  backendBaseUrl : 'https://api.getalpha.com'
};

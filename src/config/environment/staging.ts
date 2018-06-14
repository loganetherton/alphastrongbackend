// Staging config
module.exports = {
  mongo: {
    uri: process.env.MONGODB_URI
  },

  frontendBaseUrl: 'https://staging.getalpha.com/',
  backendBaseUrl : 'https://api.staging.getalpha.com'
};

var mongoUri = process.env.MONGOLAB_URI || 'localhost/moedb';
var port = process.env.PORT || 3000;
var secret = process.env.SECRET || 'moemake';
 
var config = {
  local: {
    mode: 'local',
    port: port,
    mongoUrl: mongoUri,
    secret: secret,
  },
  prod: {
    mode: 'prod',
    port: port,
    mongoUrl: mongoUri,
    secret: secret,
  }
};
 
module.exports = function (mode) {
  return config[mode || process.argv[2] || 'local'] || config.local;
};


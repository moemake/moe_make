var url = require('url');
var mongoUri = process.env.MONGOLAB_URI || 'localhost/moedb';
var redisUri = '';
console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
  redisUri = url.parse(process.env.REDISTOGO_URL);
}
var port = process.env.PORT || 3000;
var secret = process.env.SECRET || 'moemake';
 
var config = {
  local: {
    mode: 'local',
    port: port,
    mongoUrl: mongoUri,
    redisUrl: redisUri,
    secret: secret,
  },
  prod: {
    mode: 'prod',
    port: port,
    mongoUrl: mongoUri,
    redisUrl: redisUri,
    secret: secret,
  }
};
 
module.exports = function (mode) {
  return config[mode || process.argv[2] || 'local'] || config.local;
};


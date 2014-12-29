var redis = require('redis')

var client = redis.createClient(6379, "127.0.0.1", null);

client.on('error', function (err) {
    // TODO standardize log messages
    console.log('Error connecting to Redis instance:' + err);
    throw err;
});

module.exports = client;
var pm2 = require('pm2');

var instances = process.env.WEB_CONCURRENCY || -1;
var maxMemory = process.env.WEB_MEMORY      || 512;
var appName = process.env.HEROKU_APP_NAME || 'app';
var startFile = 'server/index.js';

var MACHINE_NAME = appName;
var PRIVATE_KEY  = process.env.KEYMETRICS_PRIVATE_KEY;
var PUBLIC_KEY   = process.env.KEYMETRICS_PUBLIC_KEY;

if (PRIVATE_KEY && PUBLIC_KEY) {
  pm2.connect(function() {
    pm2.start({
      script: startFile,
      name: appName,
      exec_mode: 'cluster',
      instances: instances,
      max_memory_restart: maxMemory + 'M',
      env: process.env,
      post_update: ["npm install"]
    }, function() {
      pm2.interact(PRIVATE_KEY, PUBLIC_KEY, MACHINE_NAME, function() {
        // Display logs in standard output
        pm2.launchBus(function(err, bus) {
          console.log('[PM2] Log streaming started');

          bus.on('log:out', function(packet) {
            console.log('[App:%s] %s', packet.process.name, packet.data);
          });

          bus.on('log:err', function(packet) {
            console.error('[App:%s][Err] %s', packet.process.name, packet.data);
          });
        });
      });
    });
  });
} else {
  pm2.connect(function() {
    pm2.start({
      script: startFile,
      name: appName,
      exec_mode : 'cluster',
      instances : instances,
      max_memory_restart : maxMemory + 'M',
      env: process.env,
    }, function(err) {
      if (err) return console.error('Error while launching applications', err.stack || err);
      console.log('PM2 and application has been succesfully started');

      // Display logs in standard output
      pm2.launchBus(function(err, bus) {
        console.log('[PM2] Log streaming started');

        bus.on('log:out', function(packet) {
          console.log('[App:%s] %s', packet.process.name, packet.data);
        });

        bus.on('log:err', function(packet) {
          console.error('[App:%s][Err] %s', packet.process.name, packet.data);
        });
      });

    });
  });
}

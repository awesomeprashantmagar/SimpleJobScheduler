var kue = require('kue');
var express = require('express');
var ui = require('kue-ui');

var jobs = kue.createQueue( { redis: 'redis://127.0.0.1:6379' } );

ui.setup({
apiURL: '/api',
baseURL: '/kue',
updateInterval: 60000
});

var app = express();
app.use('/api', kue.app);
app.use('/test', ui.app);

app.listen(3050);
console.log('UI started on port 3050');

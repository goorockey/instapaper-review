var config = require('./config.json');
var CronJob = require('cron').CronJob;
var email = require('./lib/email');
var instapaper = require('./lib/instapaper');

var send_review = function() {
    instapaper.get_archives(function(items) {
        email.send(items);
    });
};

try {
    new CronJob(config.review.cron_pattern, send_review, null, true);
} catch(ex) {
    console.log('CronJob failed:' + ex);
}


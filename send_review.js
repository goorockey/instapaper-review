var config = require('./config.json');
var CronJob = require('cron').CronJob;
var email = require('./lib/email');
var instapaper = require('./lib/instapaper');
var render = require('./lib/render');
var fs = require('fs');

var send_review = function() {

    instapaper.get_archives(function(archives) {
        var html = render(archives);
        if (html) email.send(html);
    });

};

try {
    // pattern: sec min hour dayOfMonth month dayOfWeek
    new CronJob(config.review.cron_pattern, send_review, null, true);
} catch(ex) {
    console.log('CronJob failed:' + ex);
}


var config = require('./config.json');
var CronJob = require('cron').CronJob;
var email = require('./lib/email');
var instapaper = require('./lib/instapaper');
var render = require('./lib/render');

var send_review = function() {

    instapaper.get_archives(function(archives) {
        if (archives.length === 0) {
            console.log("No archive to send.");
            return;
        }

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


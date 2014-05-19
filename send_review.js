#!/usr/bin/env node

var config = require('./config.json');
var CronJob = require('cron').CronJob;
var email = require('./lib/email');
var instapaper = require('./lib/instapaper');
var render = require('./lib/render');
var argv = require('optimist').argv;

var curTime = function() {
    return new Date().format('{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}');
};

var send_review = function() {
    console.log('Start sending review at ' + curTime());

    instapaper.get_archives(function(archives) {
        if (archives.length === 0) {
            console.log("No archive to send.");
            return;
        }

        render(archives, function(html) {
            if (html) email.send(html);
        });
    });
};

if (argv.fire) {
    send_review();
    return;
}

try {
    // pattern: sec min hour dayOfMonth month dayOfWeek
    console.log("Crob of sending review is running at " + curTime());
    new CronJob(config.review.cron_pattern, send_review, null, true);
} catch(ex) {
    console.log('CronJob failed:' + ex);
}


var config = require('../config.json');
var util = require('util');
var sugar = require('sugar');

var sendgrid  = require('sendgrid')(
    process.env.SENDGRID_USERNAME || config.email.username,
    process.env.SENDGRID_PASSWORD || config.email.password
);

var send = function(content) {
    if (!content || typeof content !== 'string') return;

    var time = new Date().format('{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}');

    sendgrid.send({
        to: config.email.to,
        from: config.email.from,
        subject: 'Instapaper review at ' + time,
        html: content
    }, function(err, json) {
        if (err) {
            console.error(err);
        }
        else {
            console.log(util.format('Email sent to %s at %s (%s).', config.email.to, time, json ));
        }
    });
}

exports.send = send;

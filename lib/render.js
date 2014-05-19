var config = require('../config.json');
var fs = require('fs');
var ejs = require('ejs');
var util = require('util');

var render = function(items, callback) {
    fs.readFile(config.review.template_file, 'utf8', function(err, data) {
        if (err) {
            console.err(util.format('Failed to read template file(%s)', config.review.template_file));
            return callback();
        }

        return callback(ejs.render( data, { items: items }));
    });
};

module.exports = render;

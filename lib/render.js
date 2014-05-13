var config = require('../config.json');
var fs = require('fs');
var ejs = require('ejs');

var render = function(items) {
    if (!fs.existsSync(config.review.template_file)) {
        console.err(util.format('Template file "%s" does not exist', config.review.template_file));
        return;
    }

    return ejs.render(
        fs.readFileSync(config.review.template_file, 'utf8'),
        { items: items }
    );
};

module.exports = render;

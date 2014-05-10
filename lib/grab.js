var util = require('util');
var request = require('request');
var cheerio = require('cheerio');
var sugar = require('sugar');

var username = '';
var password = '';

var url = {
    login: 'https://www.instapaper.com/user/login',
    archive: 'https://www.instapaper.com/archive',
};

var request = request.defaults({jar: true});

var get_archives_html = function(page, callback) {
  request({
      url: url['login'],
      method: "POST",
      form: {
        keep_logged_in: 'yes',
        username: username,
        password: password
      }
    }, function(err, resp, body) {

      if (err || resp.statusCode >= 400) {
        console.log(util.format('Failed to login in(code=%d).', resp.statusCode));
        return;
      }

      request({
        url: url['archive'] + '/' + page,
        method: "GET"
      }, function(err, resp, body) {

        if (err || resp.statusCode >= 400) {
          console.log(util.format('Failed to get archives(code=%d).', resp.statusCode));
          return;
        }

        callback(body);

      })
  });
};

var format_archive_item = function($, item_list) {
  var items = [];

  item_list.each(function(i, elem) {
    var item = $(elem);
    var time = item.find('div.title_meta span.meta_date').text().trim();

    if (!Date.create(time).isThisMonth()) return false;

    items[i] = {
      title: item.find('div.title_row a').text().trim(),
      link: item.find('div.title_meta span.host a').attr('href'),
      time: time,
    }
  });

  return items;
};

var get_archives = function(callback) {
  var archive_items = [];
  var page = 1;
  var process_archives = function(html) {
      if (!html) return;

      var $ = cheerio.load(html);
      var items = $('div#article_list article.article_item div.article_inner_item');
      items = format_archive_item($, items);

      if (items.length === 0) return;

      callback(items);

      archive_items.push(items);
      get_archives_html(page + 1, process_archives);
    };

  get_archives_html(page, process_archives);
};

get_archives(function(items) {console.log(items)});

exports.get_archives = get_archives;

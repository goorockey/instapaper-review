instapaper-review
=================

send review email of instapaper archives periodically

config.json:

- review
    - `last_days`: review last days
    - `cron_pattern`: cron setting for sending email
    - `template_file`:  template file for email sent, which is followed the rule of ejs engine

- email
    - `username, password`: username and plaintext password of sendgrid.
    - `to, from`: email address of email sent

- instapaper
    - `username, password`: username and plaintext password of instapaper.

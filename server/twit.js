var Twit = require('twit')
import fs from 'fs';
var T = new Twit({
  consumer_key: Meteor.settings.twit.consumer_key,
  consumer_secret: Meteor.settings.twit.consumer_secret,
  access_token: Meteor.settings.twit.access_token,
  access_token_secret: Meteor.settings.twit.access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})
//
//  tweet 'hello world!'
//
// amazon contest retweeting
let dt = moment("20180406", "YYYYMMDD").fromNow();
let dtt = (new Date()).getTime();
var txt = `#ShareforOnePlus6 / ${dtt} https://twitter.com/amazonIN/status/989165874547515392`;

Meteor.methods({
  "tweet" () {
    T.post('statuses/update', {
      status: txt
    }, function(err, data, response) {})
  },
  "rtweet" () {
    T.post('statuses/retweet/:id', {
      id: '989165874547515392'
    }, function(err, data, response) {
      console.log(data)
    })
  },
  "imgtweet" () {
    //
    // post a tweet with media
    //
    var b64content = fs.readFileSync('assets/app/twt-img.png', {encoding: 'base64'})

    // first we must post the media to Twitter
    T.post('media/upload', {
      media_data: b64content
    }, function(err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string
      var altText = "Refund request to axis bank."
      var meta_params = {
        media_id: mediaIdStr,
        alt_text: {
          text: altText
        }
      }

      T.post('media/metadata/create', meta_params, function(err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = {
            status: txt,
            media_ids: [mediaIdStr]
          }

          T.post('statuses/update', params, function(err, data, response) {})
        }
      })
    })
  }
});

SyncedCron.add({
  name: 'Refund reminder to axisbank',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 3 hours');
  },
  job: function() {
    Meteor.call('tweet', () => {});
    return;
  }
});

SyncedCron.config({
  // Log job run details to console
  log: false,

  // Use a custom logger function (defaults to Meteor's logging package)
  logger: null,

  // Name of collection to use for synchronisation and logging
  collectionName: 'cronHistory',

  // Default to using localTime
  utc: false,

  collectionTTL: 172800
});

Meteor.startup(function() {
  // The correct way
  SyncedCron.start();
});

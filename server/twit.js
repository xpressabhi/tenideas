var Twit = require('twit')

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
Meteor.methods({
  "tweet" () {
    let dt= moment("20180406", "YYYYMMDD").fromNow();
    let dtt = (new Date()).getTime();
    let txt= `I luv UPI but hate to wait for refund, Waiting since Apr 6th(${dt}) for refund @AxisBank @AxisBankSupport @UPI_NPCI @NPCI_BHIM @ICICIBank Pls help me to get refund for two failed transaction Rs 4050 each /${dtt}`;
    T.post('statuses/update', {
      status: txt
    }, function(err, data, response) {})
  }
});

SyncedCron.add({
  name: 'Refund reminder to axisbank',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 2 minutes');
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

Meteor.startup(function () {
    // The correct way
    SyncedCron.start();
});

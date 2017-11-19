// All quotes-related publications

import {Meteor} from 'meteor/meteor';
import {Quotes} from '../quotes.js';

Meteor.publish('quotes.all', function() {
  if (!this.userId) {
    return this.ready();
  }
  return Quotes.find({});
});

Meteor.publish('quotes.one', function() {
  const count = Quotes.find({show:true}).count();
  let skip = Math.floor(Math.random() * count);
  return Quotes.find({show:true}, {skip: skip, limit: 1});

});

Meteor.publish('quotesCount', function(id) {
  if (!this.userId) {
    return this.ready();
  }
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  Counts.publish(this, 'quotes', Quotes.find());
});

// All quotes-related publications

import {Meteor} from 'meteor/meteor';
import {Quotes} from '../quotes.js';

Meteor.publish('quotes.all', function(search) {
  check(search , String);
//  check(listId , String);
  if (!this.userId) {
    return this.ready();
  }
  let query = [{}];
  if (search && search.length > 2) {
    let regex = new RegExp(search, 'i');

    query = [
      {
        text: regex
      }, {
        saidBy: regex
      }
    ];
  }
  return Quotes.find({$or:query});
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

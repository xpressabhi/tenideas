// Methods related to quotes

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Quotes } from './quotes.js';

Meteor.methods({
  'quotes.insert'(title, text,saidBy) {
    check(title, String);
    check(text, String);
    check(saidBy, String);

    return Quotes.insert({
      title:title,
      text:text,
      saidBy:saidBy
    });
  },
  'quotes.remove'(quoteId){
    check(quoteId, String);
    return Quotes.remove({_id:quoteId});
  },
  'quotes.toggle'(quoteId){
    check(quoteId, String);
    const show = Quotes.findOne({_id:quoteId}).show;
    return Quotes.update({_id:quoteId},{
      $set:{
        show:!show
      }
    });
  }
});

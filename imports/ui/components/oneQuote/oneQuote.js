import { Quotes } from '/imports/api/quotes/quotes.js';
import { Meteor } from 'meteor/meteor';
import './oneQuote.html';

Template.oneQuote.onCreated(function () {
  const self=this;
  self.autorun(()=>{
    Meteor.subscribe('quotes.one');
  });

});

Template.oneQuote.helpers({
  quote() {
    return Quotes.findOne({show:true});
  },
  createdDate(date){
    return moment(date).format('MMM Do');
  }
});

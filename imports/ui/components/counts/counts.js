import './counts.html';

Template.counts.onCreated(function () {
  Meteor.subscribe('userCount');
  Meteor.subscribe('ideasCount');
  Meteor.subscribe('listsCount');
  Meteor.subscribe('quotesCount');

});

Template.counts.helpers({
  users: function(){
    return Counts.get('users');

  },
  ideas: function() {
    return Counts.get('ideas');
  },
  lists: function() {
    return Counts.get('lists');
  },
  quotes: function() {
    return Counts.get('quotes');
  }
});

// All ideas-related publications

import {Meteor} from 'meteor/meteor';
import {Ideas} from '../ideas.js';

Meteor.publish('ideas.all', function(listId, search) {
  check(search , String);
//  check(listId , String);
  if (!this.userId) {
    return this.ready();
  }
  let regex = new RegExp(search, 'i');
//  console.log(search);
    if (listId) {
      return Ideas.find({
        userId: this.userId,
        listId: listId,
        hide: {
          $ne: true
        },
        text:regex
      },{sort: {createdAt: -1}, limit: 10});
    }
    return Ideas.find({
      userId: this.userId,
      hide: {
        $ne: true
      },
      text:regex

    },{sort: {createdAt: -1}, limit: 10});

});

Meteor.publish('ideasCount', function(id) {
  if (!this.userId) {
    return this.ready();
  }
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  Counts.publish(this, 'ideas', Ideas.find());
});

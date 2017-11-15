// All ideas-related publications

import {Meteor} from 'meteor/meteor';
import {Ideas} from '../ideas.js';

Meteor.publish('ideas.all', function(listId, includeHidden) {
  if (!this.userId) {
    return this.ready();
  }

  if (includeHidden) {
    if (listId) {
      return Ideas.find({userId: this.userId, listId: listId});
    }
    return Ideas.find({userId: this.userId});
  } else {
    if (listId) {
      return Ideas.find({
        userId: this.userId,
        listId: listId,
        hide: {
          $ne: true
        }
      });
    }
    return Ideas.find({
      userId: this.userId,
      hide: {
        $ne: true
      }
    });
  }

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

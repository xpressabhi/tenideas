// All links-related publications

import {Meteor} from 'meteor/meteor';
import {Lists} from '../lists.js';

Meteor.publish('lists.all', function() {
  if (!this.userId) {
    return this.ready();
  }

  return Lists.find({
    userId: this.userId
  }, {
    sort: {
      createdAt: -1
    }
  });
});

Meteor.publish('lists.one', function(listId) {
  if (!this.userId) {
    return this.ready();
  }

  return Lists.find({
    _id: listId,
    userId: this.userId
  }, {
    sort: {
      createdAt: -1
    }
  });
});

Meteor.publish('listsCount', function(id) {
  if (!this.userId) {
    return this.ready();
  }
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  Counts.publish(this, 'lists', Lists.find());
});

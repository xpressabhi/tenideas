// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Lists } from '../lists.js';

Meteor.publish('lists.all', function () {
  return Lists.find({},{sort:{createdAt:-1}});
});

Meteor.publish('lists.one', function (listId) {
  return Lists.find({_id:listId},{sort:{createdAt:-1}});
});

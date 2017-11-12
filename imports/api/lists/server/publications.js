// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Lists } from '../lists.js';

Meteor.publish('lists.all', function () {
  return Lists.find();
});

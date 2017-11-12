// All ideas-related publications

import { Meteor } from 'meteor/meteor';
import { Ideas } from '../ideas.js';

Meteor.publish('ideas.all', function () {
  return Ideas.find();
});

// Methods related to lists

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lists } from './lists.js';

Meteor.methods({
  'lists.insert'(title) {
    check(title, String);

    return Lists.insert({
      title:title
    });
  },
});

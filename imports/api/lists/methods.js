// Methods related to lists

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lists } from './lists.js';

Meteor.methods({
  'lists.insert'(title, url) {
    check(url, String);
    check(title, String);

    return Lists.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
});

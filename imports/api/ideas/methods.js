// Methods related to ideas

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Ideas } from './ideas.js';

Meteor.methods({
  'ideas.insert'(title, url) {
    check(url, String);
    check(title, String);

    return Ideas.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
});

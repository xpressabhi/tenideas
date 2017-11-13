// Tests for the behavior of the lists collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Lists } from './lists.js';

if (Meteor.isServer) {
  describe('lists collection', function () {
    it('insert correctly', function () {
      const listId = Lists.insert({
        title: 'meteor homepage'
      });
      const added = Lists.find({ _id: listId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'lists');
      assert.equal(count, 1);
    });
  });
}

// Tests for the behavior of the ideas collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Ideas } from './ideas.js';

if (Meteor.isServer) {
  describe('ideas collection', function () {
    it('insert correctly', function () {
      const ideaId = Ideas.insert({
        listId: 'abcd1234',
        title: 'meteor homepage',
      });
      const added = Ideas.find({ _id: ideaId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'ideas');
      assert.equal(count, 1);
    });
  });
}

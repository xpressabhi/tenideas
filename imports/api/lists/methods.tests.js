// Tests for lists methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Lists } from './lists.js';
import './methods.js';

if (Meteor.isServer) {
  describe('lists methods', function () {
    beforeEach(function () {
      Lists.remove({});
    });

    it('can add a new link', function () {
      const addLink = Meteor.server.method_handlers['lists.insert'];

      addLink.apply({}, ['meteor.com', 'https://www.meteor.com']);

      assert.equal(Lists.find().count(), 1);
    });
  });
}

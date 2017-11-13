// Tests for ideas methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Ideas } from './ideas.js';
import './methods.js';

if (Meteor.isServer) {
  describe('ideas methods', function () {
    beforeEach(function () {
      Ideas.remove({});
    });

    it('can add a new link', function () {
      const addIdea = Meteor.server.method_handlers['ideas.insert'];

      addIdea.apply({}, ['meteor.com', 'https://www.meteor.com']);

      assert.equal(Ideas.find().count(), 1);
    });
  });
}

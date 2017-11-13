// Tests for the ideas publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'meteor/practicalmeteor:chai';
import { Ideas } from '../ideas.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import './publications.js';

describe('ideas publications', function () {
  beforeEach(function () {
    Ideas.remove({});
    Ideas.insert({
      listId: 'meteor homepage',
      text: 'https://www.meteor.com',
    });
  });

  describe('ideas.all', function () {
    it('sends all ideas', function (done) {
      const collector = new PublicationCollector();
      collector.collect('ideas.all', (collections) => {
        assert.equal(collections.ideas.length, 1);
        done();
      });
    });
  });
});

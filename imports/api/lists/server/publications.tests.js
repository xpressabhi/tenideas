// Tests for the lists publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'meteor/practicalmeteor:chai';
import { Lists } from '../lists.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import './publications.js';

describe('lists publications', function () {
  beforeEach(function () {
    Lists.remove({});
    Lists.insert({
      title: 'meteor homepage',
      url: 'https://www.meteor.com',
    });
  });

  describe('lists.all', function () {
    it('sends all lists', function (done) {
      const collector = new PublicationCollector();
      collector.collect('lists.all', (collections) => {
        assert.equal(collections.lists.length, 1);
        done();
      });
    });
  });
});

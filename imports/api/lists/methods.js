// Methods related to lists

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Lists} from './lists.js';
import {Ideas} from '/imports/api/ideas/ideas.js';

Meteor.methods({
  'lists.insert' (title) {
    check(title, String);

    return Lists.insert({title: title});
  },
  'lists.update'(id,title){
    check(title, String);
    check(id, String);
    Lists.update({
      _id: id
    }, {
      $set: {
        title: title
      }
    });

  },
  'lists.remove' (listId) {
    check(listId, String);
    console.log('deleting');
    const count = Ideas.find({listId: listId}).count();
    if (count === 0)
      return Lists.remove({_id: listId});
    console.log('cannot delete');
    Lists.update({
      _id: listId
    }, {
      $set: {
        ideasCount: count
      }
    });
  },
  'list.updateCount' (listId) {
    check(listId, String);
    console.log('updating');
    const count = Ideas.find({listId: listId}).count();
    Lists.update({
      _id: listId
    }, {
      $set: {
        ideasCount: count
      }
    })
  }
});

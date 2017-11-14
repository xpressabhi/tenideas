// Methods related to ideas

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Ideas } from './ideas.js';

Meteor.methods({
  'ideas.insert'(listId, text) {
    check(listId, String);
    check(text, String);

    return Ideas.insert({
      listId:listId,
      text:text
    });
  },
  'ideas.hide'(ideaId){
    check(ideaId, String);
    return Ideas.update({_id:ideaId},{
      $set:{
        hide:true
      }
    });
  },
  'ideas.show'(ideaId){
    check(ideaId, String);
    return Ideas.update({_id:ideaId},{
      $set:{
        hide:false
      }
    });
  }
});

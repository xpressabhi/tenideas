// Methods related to ideas

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Ideas } from './ideas.js';

Meteor.methods({
  'ideas.insert'(listId, text) {
    check(listId, String);
    check(text, String);

    Ideas.insert({
      listId:listId,
      text:text
    });
    Meteor.call('list.updateCount',listId);
    return;
  },
  'ideas.remove'(ideaId){
    check(ideaId, String);
    const listId= Ideas.findOne({_id:ideaId}).listId;
    Ideas.remove({_id:ideaId});
    Meteor.call('list.updateCount',listId);
    return;
  },
  'ideas.update'(ideaId,text){
    check(ideaId, String);
    check(text, String);
    return Ideas.update({_id:ideaId},{
      $set:{
        text:text
      }
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

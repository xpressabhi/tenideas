// All ideas-related publications

import { Meteor } from 'meteor/meteor';
import { Ideas } from '../ideas.js';

Meteor.publish('ideas.all', function (listId,includeHidden) {
if (includeHidden) {
  if(listId){
  return Ideas.find({listId:listId});
  }
  return Ideas.find({});
}else {
  if(listId){
  return Ideas.find({listId:listId, hide:{$ne:true}});
  }
  return Ideas.find({hide:{$ne:true}});
}

});

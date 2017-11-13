// All ideas-related publications

import { Meteor } from 'meteor/meteor';
import { Ideas } from '../ideas.js';

Meteor.publish('ideas.all', function (listId) {
  if(listId){
  return Ideas.find({listId:listId});
  }
  return Ideas.find({});
});

import { Ideas } from '/imports/api/ideas/ideas.js';
import { Lists } from '/imports/api/lists/lists.js';
import { Meteor } from 'meteor/meteor';
import './ideas.html';

Template.ideas.onCreated(function () {
  const self=this;
  self.autorun(()=>{
      Meteor.subscribe('ideas.all',FlowRouter.getParam('id'));
      Meteor.subscribe('lists.one',FlowRouter.getParam('id'));
  });
});

Template.ideas.helpers({
  ideas() {
  //  console.log('counting');
    return Ideas.find({},{sort:{createdAt:-1}});
  },
  createdDate(date){
    return moment(date).format('MMM Do YYYY hh:mm A');
  },
  list2Id(){
    console.log(FlowRouter.getParam('id'));
    return FlowRouter.getParam('id');
  },
  listTitle(){
    return Lists.findOne({}).title;
  }
});

Template.ideas.events({
  'submit .idea-add'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text;
    console.log(text.value);
    Meteor.call('ideas.insert', FlowRouter.getParam('id'),text.value, (error) => {
      if (error) {
        console.log(error);
      //  alert(error.error);
      } else {
        text.value = '';
      }
    });
  },
});

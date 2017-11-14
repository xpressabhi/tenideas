import { Ideas } from '/imports/api/ideas/ideas.js';
import { Lists } from '/imports/api/lists/lists.js';
import { Meteor } from 'meteor/meteor';
import './ideas.html';

Template.ideas.onCreated(function () {
  const self=this;
  self.includeHidden = new ReactiveVar(false);
  self.autorun(()=>{
      Meteor.subscribe('ideas.all',FlowRouter.getParam('id'),self.includeHidden.get());
      Meteor.subscribe('lists.one',FlowRouter.getParam('id'));
  });
});

Template.ideas.helpers({
  ideas() {
  //  console.log('counting');
    return Ideas.find({},{sort:{createdAt:-1}});
  },
  ideaCount(){
    return Ideas.find({}).count();
  },
  allowToAdd(){
    if(FlowRouter.getParam('id') && Ideas.find({}).count() < 10)
    return true;
    return false;
  },
  timeLapsed(){
    const createdAt = Lists.findOne({_id:FlowRouter.getParam('id')}).createdAt;
    console.log(createdAt);
    console.log(new Date());
    return moment(new Date()).diff(moment(createdAt),'minutes');
  },
  timeTakenforTen(){
    const createdAt = Lists.findOne({_id:FlowRouter.getParam('id')}).createdAt;
    const lastAdded = Ideas.findOne({listId:FlowRouter.getParam('id')},{sort:{createdAt:-1}}).createdAt;
    return moment(lastAdded).diff(createdAt,'minutes');
  },
  createdDate(date){
    return moment(date).format('MMM Do YYYY hh:mm A');
  },
  list2Id(){
    console.log(FlowRouter.getParam('id'));
    return FlowRouter.getParam('id');
  },
  listTitle(){
    return Lists.findOne({_id:FlowRouter.getParam('id')}).title;
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
  'click .hideIdea'(event){
    console.log(this._id);
    Meteor.call('ideas.hide',this._id, (error)=>{
      if (error) {
        console.log(error);
      //  alert(error.error);
      }
    })
  },
  'click .showIdea'(event){
    console.log(this._id);
    Meteor.call('ideas.show',this._id, (error)=>{
      if (error) {
        console.log(error);
      //  alert(error.error);
      }
    })
  },
  'click .toggleHidden'(e,t){
    t.includeHidden.set(!t.includeHidden.get());
  }
});

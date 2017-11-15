import { Ideas } from '/imports/api/ideas/ideas.js';
import { Lists } from '/imports/api/lists/lists.js';
import { Meteor } from 'meteor/meteor';
import './ideas.html';

Template.ideas.onCreated(function () {
  const self=this;
  self.includeHidden = new ReactiveVar(false);
  this.textLength = new ReactiveVar(0);
  self.autorun(()=>{
      Meteor.subscribe('ideas.all',FlowRouter.getParam('id'),self.includeHidden.get());
      Meteor.subscribe('lists.one',FlowRouter.getParam('id'));
  });
});

Template.ideas.helpers({
  listPresent(){
    return Lists.find({}).count() > 0;
  },
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
    const list =Lists.findOne({_id:FlowRouter.getParam('id')});
    if(list) return list._id;
    return null;
  },
  listTitle(){
    const list =Lists.findOne({_id:FlowRouter.getParam('id')});
    if(list) return list.title;
    return null;
  },
  textLength(){
    return Template.instance().textLength.get();
  },
  textSave(){
    return Template.instance().textLength.get() <= 100;
  },
  shortenBy(){
    return Template.instance().titleLength.get() - 100;
  }
});

Template.ideas.events({
  'keyup [name="text"]' (event, template) {
    let value = event.target.value.trim();
    template.textLength.set(value.length);
  },
  'submit .idea-add'(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value.trim();
    if (text.length <=100) {
      Meteor.call('ideas.insert', FlowRouter.getParam('id'),text, (error) => {
        if (error) {
          console.log(error);
        //  alert(error.error);
        } else {
          text = '';
        }
      });
    }

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

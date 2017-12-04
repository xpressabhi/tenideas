import { Lists } from '/imports/api/lists/lists.js';
import { Meteor } from 'meteor/meteor';
import './lists.html';

Template.lists.onCreated(function () {
  const self=this;
  self.titleLength = new ReactiveVar(0);
  self.showForm = new ReactiveVar(false);
  self.selectedId= new ReactiveVar();
  self.autorun(()=>{
    Meteor.subscribe('lists.all');
  });

});
Template.lists.onRendered(function(){
  $('input').focus();
});

Template.lists.helpers({
  showRemove(){
    const count =  Lists.findOne({_id:this._id}).ideasCount;
    if(count && count>0) return false;
    return true;
  },
  itsNew(){
    const count =  Lists.findOne({_id:this._id}).ideasCount;
    if(count && count > 9) return false;
    return true;
  },
  newList(){
    return Template.instance().showForm.get();
  },
  lists() {
  //  console.log('counting');
    return Lists.find({},{sort:{createdAt:-1}});
  },
  createdDate(date){
    return moment(date).format('MMM Do YYYY');
  },
  titleLength(){
    return Template.instance().titleLength.get();
  },
  titleSave(){
    return Template.instance().titleLength.get() <= 100;
  },
  shortenBy(){
    return Template.instance().titleLength.get() - 100;
  },
  plusOne(num){
    const count = Lists.find().count();
    return count - num;
  },
  editing(){
    return Template.instance().selectedId.get() === this._id;
  },
  editText(){
  //  console.log('text');
  //   $('input[name="titleEdit"]').focus();
  //   console.log($('input[name="titleEdit"]'));
    return Lists.findOne({_id:Template.instance().selectedId.get()}).title;
  }
});

Template.lists.events({
  'click .editMe'(e,t){
    e.preventDefault();
     t.selectedId.set(this._id);
  },
  'dblclick .titleText'(e,t){
//    console.log('dbclick');
    e.preventDefault();
     t.selectedId.set(this._id);
  },
  'blur [name="titleEdit"]'(e,t){
    console.log('blur');
  //  e.preventDefault();
     t.selectedId.set('');
  },
  'click .removeList'(e,t){
//    console.log(this._id);
    Meteor.call('lists.remove',this._id, (error)=>{
      if (error) {
        console.log(error);
      //  alert(error.error);
      }
    });

  },
  'click .showForm'(e,t){
  //  console.log(e);
  //  console.log(t);
    t.showForm.set(true);
  },
  'keyup [name="title"]' (event, template) {
    let value = event.target.value.trim();
    //console.log(value);
    template.titleLength.set(value.length);
  },
  'keyup [name="titleEdit"]' (event, template) {
    let value = event.target.value.trim();
  //  console.log(value);
    if(value.length > 6 && value.length<=100){
      Meteor.call('lists.update', this._id, value, (error,result) => {
    //    console.log('we are here');
        if (error) {
          console.log(error);
        //  alert(error.error);
        } else {
        }
      });
    }

  },
  'submit .list-add'(event,t) {
    event.preventDefault();
    const target = event.target;
    const title = target.title.value.trim();
    console.log(title.length);
    if(title.length > 6 && title.length<=100){
      Meteor.call('lists.insert', title, (error,result) => {
    //    console.log('we are here');
        if (error) {
          console.log(error);
        //  alert(error.error);
        } else {
        //  console.log(result);
          t.showForm.set(false);
          FlowRouter.go('/ideas/'+result);
          target.title.value = '';
        //  console.log(target.title.value);
        }
      });
    }
  },
  'submit .list-edit'(event,t) {
    event.preventDefault();
    const target = event.target;
    const title = target.titleEdit.value.trim();
    if(title.length > 6 && title.length<=100){
      Meteor.call('lists.update', this._id, title, (error,result) => {
    //    console.log('we are here');
        if (error) {
          console.log(error);
        //  alert(error.error);
        } else {
        //  console.log(result);
        //  t.showForm.set(false);
        //  FlowRouter.go('/ideas/'+result);
          target.titleEdit.value = '';
          t.selectedId.set('');
        //  console.log(target.title.value);
        }
      });
    }
  },
});

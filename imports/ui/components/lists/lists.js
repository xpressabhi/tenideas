import { Lists } from '/imports/api/lists/lists.js';
import { Meteor } from 'meteor/meteor';
import './lists.html';

Template.lists.onCreated(function () {
  const self=this;
  this.titleLength = new ReactiveVar(0);
  self.autorun(()=>{
    Meteor.subscribe('lists.all');
  });

});

Template.lists.helpers({
  lists() {
  //  console.log('counting');
    return Lists.find({},{sort:{createdAt:-1}});
  },
  createdDate(date){
    return moment(date).format('MMM Do');
  },
  titleLength(){
    return Template.instance().titleLength.get();
  },
  titleSave(){
    return Template.instance().titleLength.get() <= 100;
  },
  shortenBy(){
    return Template.instance().titleLength.get() - 100;
  }
});

Template.lists.events({
  'keyup [name="title"]' (event, template) {
    let value = event.target.value.trim();
    template.titleLength.set(value.length);
  },
  'submit .list-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title.value.trim();
    console.log(title.length);
    if(title.length<=100){
      Meteor.call('lists.insert', title, (error,result) => {
        if (error) {
          console.log(error);
        //  alert(error.error);
        } else {
          console.log(result);
          FlowRouter.go('/ideas/'+result);
          target.title.value = '';
        }
      });
    }
  },
});

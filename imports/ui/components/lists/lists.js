import { Lists } from '/imports/api/lists/lists.js';
import { Meteor } from 'meteor/meteor';
import './lists.html';

Template.lists.onCreated(function () {
  Meteor.subscribe('lists.all');
});

Template.lists.helpers({
  lists() {
  //  console.log('counting');
    return Lists.find({},{sort:{createdAt:-1}});
  },
  createdDate(date){
    return moment(date).format('MMM Do YYYY hh:mm A');
  }
});

Template.lists.events({
  'submit .list-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;
    console.log(title.value);
    Meteor.call('lists.insert', title.value, (error,result) => {
      if (error) {
        console.log(error);
      //  alert(error.error);
      } else {
        console.log(result);
        FlowRouter.go('/ideas/'+result);
        title.value = '';
      }
    });
  },
});

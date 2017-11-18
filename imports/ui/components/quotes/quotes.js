import { Quotes } from '/imports/api/quotes/quotes.js';
import { Meteor } from 'meteor/meteor';
import './quotes.html';

Template.quotes.onCreated(function () {
  const self=this;
  self.autorun(()=>{
    console.log('subscribing');
    Meteor.subscribe('quotes.all');
  });

});

Template.quotes.helpers({
  quotes() {
    return Quotes.find({},{sort:{createdAt:-1}});
  },
  createdDate(date){
    return moment(date).format('MMM Do');
  }
});

Template.quotes.events({
  'click .toggleVisibility'(event){
    Meteor.call('quotes.toggle',this._id);
  },
  'submit .quote-add'(event) {
    event.preventDefault();
    const target = event.target;
    //const title = target.title.value;
    const text = target.text.value;
    const saidBy = target.saidBy.value;
    console.log();
      Meteor.call('quotes.insert', '' ,text.trim(),saidBy.trim(), (error,result) => {
        if (error) {
          console.log(error);
        //  alert(error.error);
        } else {
          console.log(result);
          target.title.value = '';
          target.text.value = '';
          target.saidBy.value = '';
        }
      });
  },
});

import { Quotes } from '/imports/api/quotes/quotes.js';
import { Meteor } from 'meteor/meteor';
import './quotes.html';

Template.quotes.onCreated(function () {
  const self=this;
  this.searchQuery = new ReactiveVar('');
  this.searching = new ReactiveVar(false);
  self.autorun(()=>{
    self.subscribe("quotes.all",this.searchQuery.get(), () => {
      setTimeout(() => {
        this.searching.set(false);
      }, 300);
    });
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
  'keyup [name="search"]' (event, template) {
    let value = event.target.value.trim();
  //  console.log(value);
    if (!value || value === '')
      value = '';
      template.searching.set(true);
      template.searchQuery.set(value);
  },
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

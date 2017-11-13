import './nav.html';

Template.nav.onCreated(function navOnCreated() {
  // counter starts at 0

});

Template.nav.helpers({

});

Template.nav.events({
  'click .logout': () => {
    AccountsTemplates.logout();
  },
  'click #lists':()=>{
    $('#lists').addClass("active");
    $('#lists').siblings().removeClass("active");
  },
  'click #home':()=>{
    $('#home').addClass("active");
    $('#home').siblings().removeClass("active");
  },
  'click #ideas':()=>{
    $('#ideas').addClass("active");
    $('#ideas').siblings().removeClass("active");
  },
  'click #offers':()=>{
    $('#offers').addClass("active");
    $('#offers').siblings().removeClass("active");
  }

});

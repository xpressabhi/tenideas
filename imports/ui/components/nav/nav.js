import './nav.html';

Template.nav.onCreated(function navOnCreated() {
  // counter starts at 0

});

Template.nav.helpers({
 name(){
   const user = Meteor.user();
  // console.log(user);
   return user && user.profile && user.profile.firstName;
 }
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
  'click #samples':()=>{
    $('#samples').addClass("active");
    $('#samples').siblings().removeClass("active");
  },
  'click #summary':()=>{
    $('#summary').addClass("active");
    $('#summary').siblings().removeClass("active");
  }

});

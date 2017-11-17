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
  'click #title':()=>{
    $('.navbar-nav>li').removeClass("active");
  },
  'click #lists':()=>{
    $('#lists').addClass("active");
    console.log(window.location.pathname);
    $('#lists').siblings().removeClass("active");
  },
  'click #dash':()=>{
    $('#dash').addClass("active");
    $('#dash').siblings().removeClass("active");
  },
  'click #quotes':()=>{
    $('#quotes').addClass("active");
    $('#quotes').siblings().removeClass("active");
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

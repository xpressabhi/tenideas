const postSignUp = function postSignUp(userId, info) {
    //  console.log(userId);
    //  console.log(info.profile);
    //console.log('executing',info);
    Roles.addUsersToRoles(userId, ['user']);
    const count = Meteor.users.find().count();
    if(count ===1){
      Roles.addUsersToRoles(userId, ['admin']);
    }
}


AccountsTemplates.configure({
    postSignUpHook: postSignUp,
});

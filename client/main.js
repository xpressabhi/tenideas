// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';

AccountsTemplates.configure({
  //defaultTemplate: 'Auth_page',
  defaultLayout: 'App_body',
  defaultContentRegion: 'main',
  defaultLayoutRegions: {nav: 'nav'}
});

AccountsTemplates.addField({
  _id: 'firstName',
  type: 'text',
  displayName: 'First Name',
  required: true,
  minLength: 4,
  maxLength: 30,
  re: /^[a-zA-Z0-9]+$/,
  trim: true,
  placeholder: {
    signUp: "First Name",
    signIn: "First Name"
  }
});
AccountsTemplates.addField({
  _id: 'lastName',
  type: 'text',
  displayName: 'Last Name',
  required: true,
  minLength: 4,
  maxLength: 30,
  trim: true,
  re: /^[a-z0-9]+$/,
  trim: true,
  placeholder: {
    signUp: "Last Name",
    signIn: "Last Name"
  }
});


AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
  redirect: '/'
});
AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join',
  redirect: '/'
});
// AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password'
});

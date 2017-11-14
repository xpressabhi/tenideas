import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/Lists/lists.js';
import '../../ui/pages/Ideas/ideas.js';
import '../../ui/pages/samples/samples.js';
import '../../ui/pages/summary/summary.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', {nav:'nav', main: 'App_home'});
  },
});
FlowRouter.route('/lists', {
  name: 'Lists',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', {nav:'nav', main: 'Lists'});
  },
});

FlowRouter.route('/ideas', {
  name: 'Ideas',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', {nav:'nav', main: 'Ideas'});
  },
});

FlowRouter.route('/ideas/:id', {
  name: 'Ideas.List',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    BlazeLayout.render('App_body', {nav:'nav', main: 'Ideas'});
  },
});

FlowRouter.route('/samples', {
  name: 'Samples',
  action() {
    BlazeLayout.render('App_body', {nav:'nav', main: 'Samples'});
  },
});
FlowRouter.route('/summary', {
  name: 'Summary',
  action() {
    BlazeLayout.render('App_body', {nav:'nav', main: 'Summary'});
  },
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

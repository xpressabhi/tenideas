// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

Meteor.publish('userCount', function(id) {
  if (!this.userId) {
    return this.ready();
  }
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    return this.ready();
  }
  Counts.publish(this, 'users', Meteor.users.find());
});

// Definition of the ideas collection
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
SimpleSchema.extendOptions(['autoform']);

export const Ideas = new Mongo.Collection('ideas');

Ideas.schema = new SimpleSchema({
  listId:{
    type:String
  },
  text:{
    type:String
  },
  hide:{
    type:Boolean,
    defaultValue:false
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  userId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: this.userId
        };
      } else {
        if (Roles.userIsInRole(this.userId, 'admin')) {
          // allowing edit of user id
        } else {
          this.unset(); // Prevent user from supplying their own value
        }

      }
    }
  }
});

Ideas.attachSchema(Ideas.schema);

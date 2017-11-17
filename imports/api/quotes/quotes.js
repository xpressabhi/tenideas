// Definition of the Quotes collection
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
SimpleSchema.extendOptions(['autoform']);

export const Quotes = new Mongo.Collection('quotes');

Quotes.schema = new SimpleSchema({
  title:{
    type:String,
    max: 200,
    optional:true
  },
  text:{
    type:String,
    max: 200
  },
  saidBy:{
    type:String,
    max: 40
  },
  show:{
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

Quotes.attachSchema(Quotes.schema);

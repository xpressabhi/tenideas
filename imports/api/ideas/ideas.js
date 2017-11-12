// Definition of the ideas collection
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Ideas = new Mongo.Collection('ideas');

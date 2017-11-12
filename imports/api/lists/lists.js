// Definition of the lists collection
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Lists = new Mongo.Collection('lists');

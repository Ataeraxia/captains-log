import { Meteor } from "meteor/meteor";
import { Mongo } from 'meteor/mongo';
import { check } from "meteor/check";

export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer) {
  // This is called a publication
  Meteor.publish('notes', function notesPublication() {
    return Notes.find();
  });
}

Meteor.methods({
  'notes.insert'(text) {
    // Makes sure @text is a String
    // if(not a String){ throw probably new Match.Error }
    // param names: check(value, pattern)
    check(text, String);

    // No anons allowed
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Now actually do the thing
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'notes.remove'(noteId) {
    check(noteId, String);

    Notes.remove(noteId);
  },
  'notes.hide'(noteId, hidden) {
    // This method is the equiv of the tutorial's setChecked method

    check(noteId, String);
    check(hidden, Boolean);

    Notes.update(noteId, {
      $set: {
        hidden: hidden
      }
    });
  },
});
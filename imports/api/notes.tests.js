// mocha

import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { assert } from 'chai';

import { Notes } from './notes.js';

if(Meteor.isServer) {
  describe('Notes', () => {
    describe('methods', () => {
      const userId = Random.id();
      let noteId;

      beforeEach(() => {
        Notes.remove({});
        noteId = Notes.insert({
          text: 'testest',
          createdAt: new Date(),
          owner: userId,
          username: 'testmelly',
        });
      });

      it('can delete owned note', () => {
        const deleteNote = Meteor.server.method_handlers['notes.remove'];
        const invocation = { userId };

        deleteNote.apply(invocation, [noteId]);

        assert.equal(Notes.find().count(), 0);
      });
    });
  });
}
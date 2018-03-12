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

      it('can create note', function () {
        // so... create the note
        const insertNote = Meteor.server.method_handlers['notes.insert'];
        const invocation = { userId };
        const noteText = "Some more testest";

        insertNote.apply(invocation, [noteText]);

        assert.equal(Notes.find().count(), 2);
        // then make sure there are 2 notes
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
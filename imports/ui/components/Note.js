import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";

import { Notes } from "../../api/notes.js";

export default class Note extends Component {
    toggleHidden() {
        Meteor.call('notes.hide', this.props.note._id, !this.props.note.hidden);
    }

    deleteThisNote() {
        Meteor.call('notes.remove', this.props.note._id);
    }

    render() {
        const noteClassName = this.props.note.hidden ? 'hidden' : '';

        return (
            <li className={noteClassName} title={this.props.note.username}>
                <span className="note-text">{this.props.note.text}</span>
                <div className="note-extras">
                    <span className="date">{this.props.note.createdAt.toLocaleString("en-CA", {
                        hour12: true,
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    })}</span>
                    <button className="hide" onClick={this.toggleHidden.bind(this)}>
                        hide
                    </button>

                    {
                        this.props.showPublicButton ? (
                            <button className="toggle-public"
                                    onClick={this.togglePublic.bind(this)}>
                                {this.props.note.public ? 'Public': 'Private'}
                            </button>
                        ) : ''
                    }

                    <button className="delete" onClick={this.deleteThisNote.bind(this)}>
                        &times;
                    </button>
                </div>
            </li>
        );
    }
}
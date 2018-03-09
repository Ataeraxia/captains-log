import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";
import classnames from 'classnames';

import { Notes } from "../../api/notes.js";

export default class Note extends Component {
    deleteThisNote() {
        Meteor.call('notes.remove', this.props.note._id);
    }

    togglePublic() {
        Meteor.call('notes.setPublic', this.props.note._id, ! this.props.note.public);
    }

    render() {
        // I do not understand this at all
        // Okay maybe I vaguely understand
        // I guess it toggles the classnames?
        const noteClassName = classnames({
            hidden: this.props.note.hidden,
            public: this.props.note.public,
        });

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
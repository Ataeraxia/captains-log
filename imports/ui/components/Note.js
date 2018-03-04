import React, { Component } from 'react';

import { Notes } from "../../api/notes.js";

export default class Note extends Component {
    toggleHidden() {
        Notes.update(this.props.note._id, {
            $set: {
                hidden: !this.props.note.hidden
            },
        });
    }

    deleteThisNote() {
        Notes.remove(this.props.note._id);
    }

    render() {
        const noteClassName = this.props.note.hidden ? 'hidden' : '';

        return (
            <li className={noteClassName}>
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

                    <button className="delete" onClick={this.deleteThisNote.bind(this)}>
                        &times;
                    </button>
                </div>
            </li>
        );
    }
}
import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";
import classnames from 'classnames';

import { Notes } from "../../api/notes.js";

export default class Note extends Component {
    deleteThisNote() {
        Meteor.call('notes.remove', this.props.note._id);
    }

    render() {
        return (
            <li title={this.props.note.username}>
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
                    
                    <button className="delete" onClick={this.deleteThisNote.bind(this)}>
                        &times;
                    </button>
                </div>
            </li>
        );
    }
}
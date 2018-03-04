import React, { Component } from 'react';

export default class Note extends Component {
    render() {
        return (
            <li>
                <span className="note-text">{this.props.note.text}</span>
                <span className="date">{this.props.note.createdAt.toLocaleString("en-CA", {
                    hour12: true,
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                })}</span>
            </li>
        );
    }
}
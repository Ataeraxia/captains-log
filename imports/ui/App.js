import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";

import { Notes } from "../api/notes.js";

import Note from './components/Note.js';

class App extends Component {
    handleSubmit(e) {
        e.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Notes.insert({
            text,
            createdAt: new Date(),
        });

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
    renderNotes() {
        return this.props.notes.map((note) => (
            <Note key={note._id} note={note} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>
                        Captain's Log
                    </h1>
                </header>

                <form className="new-note"
                      onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text"
                           ref="textInput"
                           placeholder="Write down your thoughts" />
                </form>

                <ul>
                    {this.renderNotes()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        notes: Notes.find({}).fetch(),
    };
})(App);
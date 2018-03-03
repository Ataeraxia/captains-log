import React, { Component } from 'react';
import { withTracker } from "meteor/react-meteor-data";

import { Notes } from "../api/notes.js";

import Note from './components/Note.js';

class App extends Component {
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
import React, { Component } from 'react';

import Note from './components/Note.js';

export default class App extends Component {
    getNotes() {
        return [
            { _id: 1, text: 'Hey look a note' },
            { _id: 2, text: 'Hey look a note' },
            { _id: 3, text: 'Hey look a note' },
        ];
    }

    renderNotes() {
        return this.getNotes().map((note) => (
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
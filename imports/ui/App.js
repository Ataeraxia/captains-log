import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { withTracker } from "meteor/react-meteor-data";

import { Notes } from "../api/notes.js";

import Note from './components/Note.js';
import AccountsUIWrapper from "./components/AccountsUIWrapper.js";

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Notes.insert({
            text,
            createdAt: new Date(),
        });

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderNotes() {
        let filteredNotes = this.props.notes;

        if(this.state.hideCompleted) {
            filteredNotes = filteredNotes.filter(note => !note.hidden);
        }

        return filteredNotes.map((note) => (
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

                    <li className="nav-link">
                        <button    
                            className="hide-completed"
                            title="hide-completed"
                            readOnly
                            onClick={this.toggleHideCompleted.bind(this)}>
                            &harr;
                        </button>

                        <div id="hidden-count">
                            {this.props.hiddenCount}
                        </div>
                    </li>
                </header>

                <AccountsUIWrapper />

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
        notes: Notes.find({}, {
            sort: {
                createdAt: -1
            }
        }).fetch(),
        // $ne means "where _ not equal to _"
        // So, find the Notes where hidden is not equal to false
        // Aka find the Notes that are not shown and count them
        hiddenCount: Notes.find({ hidden: { $ne: false}}).count(),
    };
})(App);
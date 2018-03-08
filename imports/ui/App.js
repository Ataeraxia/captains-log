import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
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

        // Hey Meteor, go find the notes.insert method from imports/api/notes.js and execute it
        Meteor.call('notes.insert', text);

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

        return filteredNotes.map((note) => {
            // Is there a user? Do they have an ID?
            const currentUserId = this.props.currentUser && this.props.currentUser._id;

            // Can we show the button?
            const showPublicButton = note.owner === currentUserId;

            return (
                <Note key={note._id} 
                      note={note}
                      showPublicButton={showPublicButton} />
            );
        });
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

                {/* 
                  I would like to highlight something
                  ~"{ this.props.currentUser ? <form/> : ''"
                  (That's a highlight now okay)
                  
                  This piece of syntax is beautiful shorthand for "only display the form is there is a current user"
                */}

                { this.props.currentUser ?
                  <form className="new-note"
                      onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text"
                           ref="textInput"
                           placeholder="Write down your thoughts" />
                </form> : ''
                }

                <ul>
                    {this.renderNotes()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    // Hey go get our database
    Meteor.subscribe('notes');

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
        currentUser: Meteor.user(),
    };
})(App);
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
    }

    handleSubmit(e) {
        e.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        // Hey Meteor, go find the notes.insert method from imports/api/notes.js and execute it
        Meteor.call('notes.insert', text);

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    renderNotes() {
        let filteredNotes = this.props.notes;

        return filteredNotes.map((note) => {
            // Is there a user? Do they have an ID?
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            
            return (
                <Note key={note._id} 
                      note={note}/>
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
        currentUser: Meteor.user(),
    };
})(App);
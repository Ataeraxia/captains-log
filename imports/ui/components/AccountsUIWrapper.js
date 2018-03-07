import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

// Get this
// We are going to wrap a Blaze component
// IN A REACT COMPONENT
export default class AccountsUIWrapper extends Component {
  
  // Why do I need this?
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    // placeholder
    return <span ref="container" />;
  }
}
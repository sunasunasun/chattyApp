import React, { Component } from 'react';

export default class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onUsernameSubmit = this.onUsernameSubmit.bind(this);
  }

  onMessageSubmit(event) {
     if(event.key === 'Enter'){
      this.props.onMessageSend(event.target.value);
      event.target.value = ""
    }
  }

  onUsernameSubmit(event) {
    if(event.key === 'Enter'){
     this.props.onUserNameSend(event.target.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
       <input
        name="userNmae"
        className="chatbar-username"
        placeholder="Username"
        onKeyPress={this.onUsernameSubmit}
        />
       <input
        name="messageText"
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={this.onMessageSubmit}
        />
      </footer>
    )
  }
}


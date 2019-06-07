import React, { Component } from 'react';



export default class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  onKeyPress(event) {
     if(event.key === 'Enter'){
      this.props.onMessageSend(event.target.value);

      event.target.value = ""

    }
  }

   handleBlur(event) {
    this.props.onUserNameSend(event.target.value);
   }


  render() {


    return (
      <footer className="chatbar">
       <input
        name="userNmae"
        className="chatbar-username"
        placeholder="Username"
        onBlur={this.handleBlur}
        />
       <input
        name="messageText"
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={this.onKeyPress}
        />
      </footer>
    )
  }
}


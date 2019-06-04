import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { generateRandomId } from "./randomId.js";


export default class App extends Component {
 constructor(props) {
    super(props);
    this.state =
      {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      {
        id: 1,
        username: "Bob",
        content: "Has anyone seen my marbles?",
      },
      {
        id: 2,
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
    ]
    };

    this.keyDown = this.keyDown.bind(this);
  }


keyDown(event){
   if(event.key == 'Enter'){
   console.log("this is event", event.target.value)


    const newMessage = {
      id: generateRandomId(),
      username: "Michelle",
      content: event.target.value
    };

    const messages = this.state.messages.concat(newMessage)

    this.setState({messages: messages})

  }
}

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar onKeyPress={this.keyDown} currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
}


import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import { generateRandomId } from "./randomId.js";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.webSocket = null
    this.state =
    {
      oldUsername: "",
      currentUser: "",
      messages: []
      // notification: [],
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }


 componentDidMount(){
  var webSocket = new WebSocket("ws://localhost:3001");
  webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const messages = this.state.messages.concat(data)


    switch(data.type) {
      case "incomingMessage":
        // handle incoming message
        this.setState({
          messages: messages
        })
        break;
      case "incomingNotification":
        // handle incoming notification
        this.setState({
          messages: messages
        })
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
this.setState({
      oldUsername: this.state.currentUser,
      //currentUser: userNmae
    })
  }


  this.webSocket = webSocket
 }



 changeUserName(userNmae){
     this.setState({
      oldUsername: this.state.currentUser,
      currentUser: userNmae
    })
 }



  addNewMessage(messageText) {


let olduser = this.state.oldUsername ?  this.state.oldUsername:  "Anonymous"
    let notification = {
      type: "postNotification",
      content: olduser + " has changed their name to " + this.state.currentUser
    };

    const newMessage = {
      id: generateRandomId(),
      type: "postMessage",
      username: this.state.currentUser ?  this.state.currentUser:  "Anonymous",
      content: messageText
    };

    if(this.state.currentUser != this.state.oldUsername){
    let notification1 = this.state.messages.concat(notification)
    this.setState({
      messages: notification1
    })
    }

    // console.log(JSON.stringify(newMessage))
    this.webSocket.send(JSON.stringify(newMessage, notification))
   }

  render() {
    return (
      <div>
        <MessageList oldUsername={this.state.oldUsername} currentUser={this.state.currentUser} messages={this.state.messages} notification={this.state.notification}/>

        <ChatBar onUserNameSend={this.changeUserName} onMessageSend={this.addNewMessage} currentUser={this.state.currentUser.name}/>

      </div>
    );
  }
}









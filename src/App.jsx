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
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.addNewMessage = this.addNewMessage.bind(this);
  }


 componentDidMount(){
  var webSocket = new WebSocket("ws://localhost:3001");
  webSocket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    const messages = this.state.messages.concat(message)
    this.setState({
      messages: messages
    })
  }
  this.webSocket = webSocket
 }




  addNewMessage(messageText) {
    const newMessage = {
      id: generateRandomId(),
      username: "Bob",
      content: messageText
    };

    this.webSocket.send(JSON.stringify(newMessage))
   }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        // <ChatBar onKeyPress={this.keyDown} currentUser={this.state.currentUser.name}/>
        <ChatBar onMessageSend={this.addNewMessage} currentUser={this.state.currentUser.name}/>

      </div>
    );
  }
}








// keyDown(event){
//    if(event.key === 'Enter'){
//    // console.log("this is event", event.target.value)


//     const newMessage = {
//       id: generateRandomId(),
//       username: "Bob",
//       content: event.target.value
//     };

//     const messages = this.state.messages.concat(newMessage)

//     event.target.value = ""

//     this.setState({
//       messages: messages,
//     })

//   }
// }


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
      currentUser: "",
      messages: []
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
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

 changeUserName(userNmae){
     this.setState({
      currentUser: userNmae
    })
 }


  addNewMessage(messageText) {

    const newMessage = {
      id: generateRandomId(),
      username: this.state.currentUser,
      content: messageText
    };

    this.webSocket.send(JSON.stringify(newMessage))
   }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        // <ChatBar onKeyPress={this.keyDown} currentUser={this.state.currentUser.name}/>
        <ChatBar onUserNameSend={this.changeUserName} onMessageSend={this.addNewMessage} currentUser={this.state.currentUser.name}/>

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


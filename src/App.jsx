import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {
  //set original state
    constructor(props) {
        super(props);
        this.webSocket = null
        this.state = {
            oldUsername: "",
            currentUser: "",
            messages: [],
            counter: 0
        };

        this.addNewMessage = this.addNewMessage.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
    }

    componentDidMount() {
        var webSocket = new WebSocket("ws://localhost:3001");
        //receive data from sever
        webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            const messages = this.state.messages.concat(data)
            console.log(data.clients)
            switch (data.type) {
                case "incomingMessage":
                    // handle incoming message
                  this.setState({messages: messages})
                break;

                case "incomingNotification":
                  this.setState({messages: messages})
                  break;

                case 'numberOfClients':
                  this.setState({counter: data.clients})
                  break;

                default:
                    // show an error in the console if the message type is unknown
                  throw new Error("Unknown event type " + data.type);
            }
        }
        this.webSocket = webSocket
    }

    changeUserName(userName) {
        console.log("change username", userName)
        this.setState({
            oldUsername: this.state.currentUser,
            currentUser: userName
        }, () => {
            let olduser = this.state.oldUsername ? this.state.oldUsername : "Anonymous"

        let notification = {
            id: "",
            type: "postNotification",
            oldUsername: this.state.currentUser,
            currentUser: userName,
            content: olduser + " has changed their name to " + this.state.currentUser
        };
        //if old username is not equal to new username, send notification to server
         if (this.state.currentUser != this.state.oldUsername) {
            let newNotification = this.state.messages.concat(notification)
            this.setState({
                messages: newNotification
            })
            this.webSocket.send(JSON.stringify(notification))
         }
        })
    }

    addNewMessage(messageText) {
        const newMessage = {
            id: "",
            type: "postMessage",
            username: this.state.currentUser ? this.state.currentUser : "Anonymous",
            content: messageText,
            color: null
        };
       // send notification and newMessage to server
        this.webSocket.send(JSON.stringify(newMessage))
    }

    render() {
        return (
          <div>
            <nav className = "navbar">
              <a className = "navbar-brand">
               Chatty
              </a>
              <p className = "counter">
                { this.state.counter } Users Online
              </p>
            </nav>
            <MessageList
              oldUsername = { this.state.oldUsername }
              currentUser = { this.state.currentUser }
              messages = { this.state.messages }
            />
            <ChatBar
              onUserNameSend = { this.changeUserName }
              onMessageSend = { this.addNewMessage }
              currentUser = { this.state.currentUser.name }
            />
          </div>
        );
    }
}








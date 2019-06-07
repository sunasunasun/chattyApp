import React, {
    Component
} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import {
    generateRandomId
} from "./randomId.js";


export default class App extends Component {
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
        webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            const messages = this.state.messages.concat(data)
            console.log(data)
            switch (data.type) {
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

                case 'numberOfClients':
                    this.setState(priorState => {
                        const current = Object.create(priorState);
                        current.counter = data.clients;
                        return current;
                    });
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



    changeUserName(userNmae) {
        this.setState({
            oldUsername: this.state.currentUser,
            currentUser: userNmae
        })
    }


    addNewMessage(messageText) {
        //if username is empty then show Anonymous
        let olduser = this.state.oldUsername ? this.state.oldUsername : "Anonymous"

        let notification = {
            type: "postNotification",
            content: olduser + " has changed their name to " + this.state.currentUser
        };

        const newMessage = {
            id: generateRandomId(),
            type: "postMessage",
            username: this.state.currentUser ? this.state.currentUser : "Anonymous",
            content: messageText,
            color: null
        };

        if (this.state.currentUser != this.state.oldUsername) {
            let notification1 = this.state.messages.concat(notification)
            this.setState({
                messages: notification1
            })
            this.webSocket.send(JSON.stringify(notification))
        }

        // send notification and newMessage to server
        this.webSocket.send(JSON.stringify(newMessage))

    }

    render() {
        return (
          < div >
            < nav className = "navbar" >
              < a className = "navbar-brand" >
               Chatty
              </a>
              < p className = "counter" >
                { this.state.counter }Users Online
              </p>
            </nav>

            < MessageList
              oldUsername = { this.state.oldUsername }
              currentUser = { this.state.currentUser }
              messages = { this.state.messages }
            />

            < ChatBar
              onUserNameSend = { this.changeUserName }
              onMessageSend = { this.addNewMessage }
              currentUser = { this.state.currentUser.name }
            />
          < /div >
        );
    }
}








import React, { Component } from 'react';

import Message from './Message.jsx';

export default class MessageList extends Component {


  render() {

    console.log(this.props.messages)
    const messages = this.props.messages.map(message => {

     if(message.type==="incomingMessage"){
      return(
        <Message
          key={ message.id }
          username={ message.username }
          content={ message.content }
        />
        )}else if(message.type==="incomingNotification"){
        return (
          <div key ={message.id} className="notification">
             <span className="notification-content">{message.content}</span>
          </div>
          )
      }
    });
    console.log(messages)


    return (
      <section className="messages">
      { messages }

      </section>
      )
  }
}



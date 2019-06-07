import React, { Component } from 'react';

import Message from './Message.jsx';

export default class MessageList extends Component {


    render() {

        const messages = this.props.messages.map(message => {
        //deal with incomingMessage and incomingNotification
            if (message.type === "incomingMessage") {
                return ( < Message
                           key = { message.id }
                           username = { message.username }
                           content = { message.content }
                           color = { message.color }
                        /> )
              } else if (message.type === "incomingNotification") {
                return ( < div key = { message.id } className = "notification" >
                           < span className = "notification-content" > { message.content } < /span>
                         < /div>
                       )
                }
            });

        return ( < section className = "messages" >
                  { messages }
                 < /section>
               )
      }
    }


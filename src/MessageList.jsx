import React, { Component } from 'react';

import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      return <Message
        key={ message.id }
        username={ message.username }
        content={ message.content }
        />
    });

    return (
      <section className="messages">
        { messages }
      </section>
    )
  }
}



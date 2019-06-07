import React, { Component } from 'react';
export default class Message extends Component {
  render() {

 // console.log(this.props.color)
    return (

      <main className="messages">
        <div className="message">
          <span className="message-username" >
           <font color={this.props.color}>{ this.props.username }</font>
          </span>
          <span className="message-content">{ this.props.content }</span>
        </div>
      </main>
    )
  }
}


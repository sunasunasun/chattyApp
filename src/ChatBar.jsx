import React, { Component } from 'react';



export default class ChatBar extends Component {
  handleKeyPress = (event) => {
  if(event.key == 'Enter'){
    console.log(event.target.value)
  }
}

  render() {
    return (
      <footer className="chatbar">
       <input className="chatbar-username" placeholder={ this.props.currentUser.name } />
       <input className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={this.props.onKeyPress}/>
      </footer>
    )
  }
}


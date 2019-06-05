import React, { Component } from 'react';



export default class ChatBar extends Component {
  // handleKeyPress = (event) => {
  //   event.preventDefault();
  //   if(event.key == 'Enter'){
  //     console.log(event.target.value)
  //   }
  // }
  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
     if(event.key === 'Enter'){
      this.props.onMessageSend(event.target.value);
      event.target.value = ""
    }
  }


  render() {


    return (
      <footer className="chatbar">
       <input className="chatbar-username" placeholder="Username" />
       <input className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={this.onKeyPress}/>
      </footer>
    )
  }
}


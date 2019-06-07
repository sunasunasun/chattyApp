Stack:

Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
WebSockets using Node package ws on the server-side, and native WebSocket on client side
ReactJS

# Chatty-App!!

Chatty allow users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

## Behaviour

🤓 When any connected user sends a chat message, all connected users receive and display the message

😃 When any connected user changes their name, all connected users are notified of the name change


😌 Header displays the count of connected users

🤩 When the number of connected users changes, this count will be updated for all connected users

😁 Different users' names will each be coloured differently


## Final Product
!["Tweet1"](https://github.com/sunasunasun/tweeter/blob/master/doc/tweetc.png?raw=true)
!["Tweet hide form"](https://github.com/sunasunasun/tweeter/blob/master/doc/tweeta.png?raw=true)
!["Tweet is empty"](https://github.com/sunasunasun/tweeter/blob/master/doc/tweetb.png?raw=true)

## Dependencies

### Clinets side
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom

### serve side
- express
- ws
- uuid

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:3001/>. Start client side using the `npm start` command.
4. Go to <http://localhost:3000/> in your browser.
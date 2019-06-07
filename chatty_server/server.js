const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');


const usersOnLine = {
    type: 'numberOfClients',
    clients: wss.clients.size,
  }


  // Inform all clients
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(usersOnLine));
    }
  });



  ws.on('message', function incoming(data) {
    var dataParse = JSON.parse(data)

    //var dataParse1 = JSON.parse(not)
    //console.lo
    console.log(dataParse)
    switch(dataParse.type) {
      case "postMessage":
        dataParse.type = "incomingMessage"
        break;
      case "postNotification":
        dataParse.type = "incomingNotification"
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + dataParse.type);
    }
      // console.log(JSON.stringify(dataParse))
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(dataParse));
      }
    });
  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});


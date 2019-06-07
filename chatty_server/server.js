const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');
const colors = ['yellow', 'blue', 'red', 'violet', 'pink', 'orange'];

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
    server
});

wss.on('connection', (ws) => {

    const randomColor = Math.floor(Math.random() * 6);
    const color = colors[randomColor];

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

        //switch post to incoming
        switch (dataParse.type) {
            case "postMessage":
                dataParse.id = uuidv1();
                dataParse.type = "incomingMessage";
                dataParse.color = color;
                break;

            case "postNotification":
                dataParse.id = uuidv1();
                dataParse.type = "incomingNotification"
                break;

            default:
                // show an error in the console if the message type is unknown
                throw new Error("Unknown event type " + dataParse.type);
        }

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(dataParse));
            }
        });
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});
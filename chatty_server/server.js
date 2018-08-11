// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Generate a random color for each user
function genRandColor() {
  let hexacode = '0123456789ABCDEF';
  let randcolor = '#';
  for (let i = 0; i < 6; i++) {
    randcolor += hexacode[Math.floor(Math.random() * 16)];
  }
  return randcolor;
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const randcolor = genRandColor(); // assign a random color and let it persist for each client session

  ws.on('message', function incoming(message) {
    const objMessage = JSON.parse(message);
    objMessage.clientcount = wss.clients.size;
    switch (objMessage.type) {
      case "postMessage":
        objMessage.type = "incomingMessage";
        objMessage.color = randcolor;
        break;
      case "postNotification":
        objMessage.type = "incomingNotification";
        objMessage.content = `${objMessage.oldusername} changed their name to ${objMessage.newusername}`
        objMessage.color = randcolor;
        break;
      default:
        objMessage.type = "UnknownMessage";
    }
    wss.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        objMessage.clientcount = wss.clients.size;
        client.send(JSON.stringify(objMessage));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    let clientcount = { type: 'ccount', clientcount: wss.clients.size };
    wss.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(clientcount));
      }
    });
  });

});
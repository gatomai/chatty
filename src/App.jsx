import React, { Component } from 'react';
import UsersOnline from './UsersOnline.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const uid = () => Math.random().toString(34).slice(2);
var usercolors = ["indianred", "gold", "khaki", "midnightblue"];

// Fake messages for testing
// const state_init =
// {
//   currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       id: uid(),      
//       username: 'Bob',
//       content: 'Has anyone seen my marbles?'
//     },
//     {
//       id: uid(),
//       username: 'Anonymous',
//       content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
//     }
//   ]
// }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' },
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    this.addChatMessage = this.addChatMessage.bind(this);
  }

  //Function to insert a new chat message
  addChatMessage(chatMsg) {
    let newChat = { id: uid(), type: 'postMessage', clientcount: 1, username: this.state.currentUser.name, content: chatMsg };
    this.socket.send(JSON.stringify(newChat));
  }

  //Function to effect the change in the UserName  
  changeUsername = (userName) => {
    let newNotif = {
      id: uid(),
      type: 'postNotification',
      clientcount: 1,
      oldusername: this.state.currentUser.name,
      newusername: userName,
      content: '',
      color: ''
    };
    this.socket.send(JSON.stringify(newNotif));
    if (userName) {
      this.setState({ currentUser: { name: userName } });
    }
  }

  //Below code will execute after all the components and page have been rendered
  componentDidMount() {
    setTimeout(() => {

      // Add a new message to the list of messages in the data store
      const newMessage = { id: uid(), username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage)

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);

    const socketConnection = new WebSocket('ws://localhost:3001');
    this.socket = socketConnection;
    socketConnection.onopen = function (event) {
      console.log('Connected to Server');
    };

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log('From client', msg.clientcount);
      switch (msg.type) {
        case "incomingMessage":
          msg.content = `${msg.content}`;
          break;
        case "incomingNotification":
          msg.content = `${msg.content}  ${'::'}`;
          break;
        case "ccount":
          this.setState({ clientcount: msg.clientcount });
          break;
        default:
          msg.content = 'Something happened';
      }
      const messages = [...this.state.messages, msg]
      this.setState({ messages: messages });
      this.setState({ clientcount: msg.clientcount });
    }
  }

  render() {
    return (
      <div>
        <UsersOnline usersonline={this.state.clientcount} />
        <MessageList messages={this.state.messages} />
        <ChatBar addChatMessage={this.addChatMessage} changeUsername={this.changeUsername} currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;

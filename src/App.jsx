import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const uid = () => Math.random().toString(34).slice(2);

const state_init =
{
  currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: 'Bob',
      content: 'Has anyone seen my marbles?',
      id: uid()
    },
    {
      username: 'Anonymous',
      content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
      id: uid()
    }
  ]
}


class App extends Component {
  constructor(props) {
    super(props);
    // this.state = state_init; Cleaning up fake messages.
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [] // messages coming from the server will be stored here as they arrive
    };    
    this.addChatMessage = this.addChatMessage.bind(this);
  }

  addChatMessage(chatMsg) {
    let newChat = {id: uid(), username: this.state.currentUser.name, content: chatMsg};
    // const messages = [...this.state.messages, newChat]
    // this.setState({messages});
    this.socket.send(JSON.stringify(newChat));
    // this.socket.send(this.state.currentUser.name + chatMsg));

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: uid(), username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);

    var socketConnection = new WebSocket('ws://localhost:3001');
    this.socket = socketConnection;
    // console.log(socketConnection);
    socketConnection.onopen = function (event) {
    console.log('Connected to Server');       
    
    // alert("onopen");

    // const msg = 'Here is some text that the server is urgently awaiting!';
    // this.socket.send(msg);   
    };
    this.socket.onmessage =  (event) => {
      var msg = JSON.parse(event.data);
      const messages = [...this.state.messages, msg]
      this.setState({messages});
      } 

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty App</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar addChatMessage={this.addChatMessage} currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;

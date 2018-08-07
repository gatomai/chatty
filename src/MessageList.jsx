import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        let messages = this.props.messages.map((message) =>   <Message key={message.id} message={message}/>);
        return (
            <div className="messagelist">
                {messages}
            </div>
        );
    }
}

export default MessageList;

// renderMessages = () => {
//     return this.state.messages.map(message => (
//       <Message username = {message.username} content={message.content} />  
//     ));
//   };
import React, { Component } from 'react';

class Message extends Component {
    render() {
        const msgType = this.props.message.type;
        // console.log('From Mesage.jsx',msgType);
        if ( this.props.message.type && msgType === 'incomingMessage') {
            return (
                <div className="message">
                    <span className="message-username">{this.props.message.username}</span>
                    <span className="message-content">{this.props.message.content}</span>
                </div>
            );
        } else if (this.props.message.type && msgType === 'incomingNotification') {
            return (
                <div className="message system">
                    <span className="message-content">{this.props.message.content}</span>
                </div>
            );            
        }
        else {
            return (
                <div className="message">
                    <span className="message-username">{this.props.message.username}</span>
                    <span className="message-content">{this.props.message.content}</span>
                </div>
            );            
        }
    }
}

export default Message; 
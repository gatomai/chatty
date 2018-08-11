import React, { Component } from 'react';

class Message extends Component {
    render() {

        let content = this.props.message.content;
        let imagepresent = false;
        let tag = '';
        var result = content.substring(content.length - 3);
        if (result === 'jpg' || result === 'gif' || result === 'png') {
            tag = (<img className="message-img" src={this.props.message.content} />);
            // tag = (<div style="text-align: left"><img src={this.props.message.content} width="100" /></div>)
            imagepresent = true;
        }
        else {
            tag = (<span className="message-content">{this.props.message.content}</span>);

        }

        const msgType = this.props.message.type;
        if (this.props.message.type && msgType === 'incomingMessage') {
            return (
                <div className="message">
                    <span className="message-username" style={{ color: this.props.message.color }}>{this.props.message.username}</span>
                    {tag};
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
                    <span className="message-username" style={{ color: this.props.message.color }}>{this.props.message.username}</span>
                    <span className="message-content">{this.props.message.content}</span>
                </div>
            );
        }
    }
}

export default Message; 
import React, { Component } from 'react';
class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = { message: "", username: props.currentUser }
    }
    handleKeyPress(evt) {
        if (evt.key === 'Enter') {
            this.props.addChatMessage(this.state.message);
            this.setState({ message: '' })
        }

        // console.log(evt.target);
        // const chatBarInput = evt.target.elements.name;
        // console.log(evt.target.elements.name);
        // console.log(evt.target.elements.name.value);
        // chatInput.value = '';
    };

    handleNewUsername = (evt) => {
        if (evt.key === 'Enter') {
            this.props.changeUsername(evt.target.value);
        }
    }

    handleMessageChange = event => {
        this.setState({ message: event.target.value })
    }
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username"
                    defaultValue={this.state.username}
                    placeholder="Your Name (Optional)"
                    onKeyPress={this.handleNewUsername}
                />
                <input
                    className="chatbar-message"
                    name="chatInput"
                    onKeyPress={this.handleKeyPress}
                    placeholder="Type a message and hit ENTER"
                    onChange={this.handleMessageChange} value={this.state.message}
                />
            </footer>

        )
    }

}
export default ChatBar;
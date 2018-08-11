import React, { Component } from 'react';

export default function UsersOnline({ usersonline }) {
    return (
        <div className='container'>
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty App</a>
                <span className="users-online chatbar-username">#{usersonline} users online</span>
            </nav>
        </div>
    );
}

UsersOnline.propTypes = {
    message: React.PropTypes.object.isRequired
}
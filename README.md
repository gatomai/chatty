### Overview
The Chatty App will allow users to communicate with each other without having to register accounts. 

It is similar to the Slack App in terms of functionality.

It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

##Stack:

Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
WebSockets using Node package ws on the server-side, and native WebSocket on client side
ReactJS

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)


### Usage
Clone the repository.

```
git clone git@github.com:gatomai/chatty.git
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```
To install the server:
```
cd chatty_server
npm install
npm start
open http://localhost:3001
```
### Final Product Screenshots
The Main Screen

![Main Screen](https://github.com/gatomai/chatty/blob/master/screenshots/MainScreen.png)

The notification of a Username change

!["Shows the effect of a Username change:"](https://github.com/gatomai/chatty/blob/master/screenshots/Username-Change.png)

The Username being displayed in a random color

!["Shows the Username in a random color:"](https://github.com/gatomai/chatty/blob/master/screenshots/Username-RandomColor.png)

The Number of Online Users

!["Shows Number of Online Users:"](https://github.com/gatomai/chatty/blob/master/screenshots/Show-Users-Online.png)


The chat window showing pictures

![With Picture](https://github.com/gatomai/chatty/blob/master/screenshots/With-Picture.png)

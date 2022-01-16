import React from 'react';
import './App.css';
import io from 'socket.io-client'



class App extends React.Component {
  
  state={message:'adlfjsdjflsjd'}

  constructor(props){
    super(props);

    this.socket = io("localhost:5000", {
      path: '/chat',
      transports: ['websocket'],
      autoConnect: true,
    });
    this.socket.on('connect', () => {
      console.log('connect')
      this.socket.emit('hello', {
          login: 1,
          skipSendChats: true,
      });

      this.socket.on('error_message', (msg) => console.log('error', msg))
      //this.socket.emit(events_1.socketEvents.HELLO, this.getHelloMessage());
    });
  }

  readChat(){
    console.log('read chat');
    this.socket.emit('read_chat', {
      login: 1,
      chatId: 1,
      role: 'admin'
    })
  }

  addMessage(){
    this.socket.emit('add_message', {
      login: 1,
      chatId: 1,
      role: 'admin',
      text: this.state.message,
      localTimestamp: (new Date()).getTime()
    })
  }
  
  
  render(){
    return (
      <div className="App">
          <h1>Hello world</h1>
          <div>
            <button onClick={() => this.readChat()}>Read chat</button>
          </div>
          <div>
            <input type="text" onChange={e => this.setState({message:e.target.value})} /> 
            <button onClick={() => this.addMessage()}>Add message</button>
          </div>
      </div>
    );
  }
  
}

export default App;

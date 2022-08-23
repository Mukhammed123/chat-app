import '../HomeView.css';
import React, { Component } from 'react';


class HomeView extends Component {
  state = {
    message: '',
    currentMessages: []
  }
  inputMessage = (e) => {
    this.setState({
      message: e.target.value
    })
  }
  addMessage = () => {
    if(this.state.message.length > 0) {
      const arr = [...this.state.currentMessages, this.state.message];
      this.setState({
        currentMessages: arr
      });
      this.setState({
        message: ''
      });
      localStorage.setItem('messages', arr);
      
      
    }
  }
  componentDidMount() {
    const localStData = localStorage.getItem('messages');
    console.log(localStData)
    const temp = JSON.parse(JSON.stringify(localStData));
    console.log(temp)
  }
  render() {
    return (
      <div className='home'>
        <div className='messenger'>
          <div className='messenger-block'>
            <div className='top-bar'></div>
            <div className='body'>
              <div className='messages-container'>
                {
                  this.state.currentMessages.map((message, index) => <div key={index} className="message-item">{message}</div>)
                }
              </div>
            </div>
            <div className='bottom-bar'>
              <input type="text" value={this.state.message} onChange={this.inputMessage}/> <button onClick={this.addMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView;
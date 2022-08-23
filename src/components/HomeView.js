import '../styles/HomeView.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router';


class HomeView extends Component {
  state = {
    name: null,
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
    const sessionData = sessionStorage.getItem('user');
    if(!sessionData) this.props.history.push('/login');
    else {
      this.setState({
        name: sessionData
      });
      const localStData = localStorage.getItem('messages');
      const temp = JSON.parse(JSON.stringify(localStData));
    }
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
              <input type="text" className='input-message' value={this.state.message} onChange={this.inputMessage}/>
              <button className='send-button' onClick={this.addMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(HomeView);
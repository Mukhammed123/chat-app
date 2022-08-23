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
      const time = new Date().toLocaleTimeString().split(' ')
      const arr = this.state.currentMessages;
      arr.push({user: this.state.name, message: this.state.message, sent_at: `${time[1]} ${time[0]}`});
      this.setState({
        message: ''
      });
      localStorage.setItem('messages', JSON.stringify(arr));

      this.scrollBottom();
    }
  }
  scrollBottom = () => {
    const myDiv = document.getElementById("body-container");
    console.log(myDiv)
    myDiv.scrollTo(0, myDiv.scrollHeight + 60);
  }
  setMessages = () => {
    const localStData = localStorage.getItem('messages');
    const temp = localStData ? JSON.parse(localStData) : [];
    this.setState({
      currentMessages: temp,
    });
  }
  async componentDidMount() {
    const sessionData = sessionStorage.getItem('user');
    if(!sessionData) this.props.history.push('/login');
    else {
      window.addEventListener('storage',(e)=>{
        this.setMessages();
      });
      this.setState({
        name: sessionData
      });
      await this.setMessages();
      this.scrollBottom();
    }
  }
  render() {
    return (
      <div className='home'>
        <div className='messenger'>
          <div className='messenger-block'>
            <div className='top-bar'></div>
            <div id='body-container'>
              <div className='body'>
                <div className='messages-container'>
                  {
                    Array.isArray(this.state.currentMessages) ?
                      this.state.currentMessages.map((data, index) => <div 
                          key={index} 
                          className="message-block"
                        >
                          <div className="message-sender" style={{textAlign: data.user === this.state.name ? 'end' : 'start'}}>{data.user}</div>
                          <div className='message-content' style={{justifyContent: data.user === this.state.name ? 'flex-end' : 'flex-start'}}>
                            <div className={`message-item ${data.user === this.state.name ? 'user-sent' : ''}`}>{data.message}</div>
                          </div>
                          <span className='message-time'>{data.sent_at}</span>
                        </div>
                        )
                      : null
                  }
                </div>
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

export default withRouter(HomeView)
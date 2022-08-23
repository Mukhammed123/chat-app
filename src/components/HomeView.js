import '../styles/HomeView.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router';


class HomeView extends Component {
  state = {
    name: null,
    message: '',
    currentMessages: [],
  }
  inputMessage = (e) => {
    this.setState({
      message: e.target.value
    })
  }
  addMessage = async () => {
    if(this.state.message.length > 0) {
      const time = new Date().toLocaleTimeString().split(' ')
      const arr = this.state.currentMessages;
      arr.push({user: this.state.name, message: this.state.message, sent_at: `${time[1]} ${time[0]}`});
      await this.setState({
        message: ''
      });
      localStorage.setItem('messages', JSON.stringify(arr));

      this.scrollBottom();
    }
  }
  scrollBottom = () => {
    const myDiv = document.getElementById("body-container");
    myDiv.scrollTo(0, myDiv.scrollHeight + 60);
  }
  setMessages = () => {
    const localStData = localStorage.getItem('messages');
    const data = localStData ? JSON.parse(localStData) : [];
    const temp = JSON.parse(JSON.stringify(data));
    temp.sort((a,b) => (a.sent_at > b.sent_at) ? -1 : (a.sent_at < b.sent_at) ? 1 : 0);
    console.log(temp.length, this.state.currentMessages.length + 25)
    let arr = temp.length > this.state.currentMessages.length + 25 ?
      temp.splice(0, this.state.currentMessages.length + 25) : data;
    arr.sort((a,b) => (a.sent_at > b.sent_at) ? 1 : (a.sent_at < b.sent_at) ? -1 : 0);
    this.setState({
      currentMessages: arr,
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
            <div className='load-more-container' style={{zIndex: '5'}}>
                <button onClick={this.setMessages}>Load More</button>
              </div>
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
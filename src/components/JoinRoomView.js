import '../styles/JoinRoom.css'
import React, {Component} from 'react';
import { withRouter } from 'react-router';

class JoinRoomView extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  handleJoin = () => {
    if(this.state.name.length > 0) {
      sessionStorage.setItem('user', this.state.name);
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className='join-room'>
        <div className='input-container'>
          <input type='text' className='name-input' placeholder='Enter your name...' onChange={this.handleChange}/>
          <button className='join-btn' onClick={this.handleJoin}>Join</button>
        </div>
      </div>
    )
  }
}

export default withRouter(JoinRoomView);
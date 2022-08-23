import './styles/App.css';
import HomeView from './components/HomeView';
import JoinRoomView from './components/JoinRoomView';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route path="/login">
            <JoinRoomView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

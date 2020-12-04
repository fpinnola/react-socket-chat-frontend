import './App.css';

import Home from './Home';
import ChatRoom from './ChatRoom';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:roomId/:nickname' component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;

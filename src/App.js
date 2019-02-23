import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Cabinet from './components/Cabinet';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Route exact path='/' component={LoginForm}/>
          <Route exact path='/admin' component={Cabinet}/>
        </div>
      </Router>
    );
  }
}

export default App;

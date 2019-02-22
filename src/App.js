import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            Hi, manager!
          </header>
          <Route exact path='/' component={LoginForm}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

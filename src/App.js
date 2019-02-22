import React, { Component } from 'react';
import LoginForm from './components/LoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hi, manager!
        </header>
        <LoginForm/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
    console.log("Dishes Loaded: ", this.state.dishes); // Debugging log
  }
  
  render() {
    return (
      <div className="App">
        <h1>Welcome to My App</h1> {/* Add this to check if the app renders */}
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App;

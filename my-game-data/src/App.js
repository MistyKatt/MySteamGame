import React, { Component } from 'react';
import './App.css';
import MyNavbar from './Component/Navbar/Navbar'
import {Route, Link, Switch} from 'react-router-dom'
import Gameinfo from './Container/Gameinfo/Gameinfo'
import Settings from './Container/Settings/Settings'


class App extends Component {

  componentDidMount(){

  }

  render() {
    return (
      <div className="App">
        <MyNavbar/> 
        <Switch>
          <Route path='/settings' component={Settings}></Route>
          <Route path='/'  component={Gameinfo} ></Route>
        </Switch>      
      </div>
    );
  }
}



export default App;

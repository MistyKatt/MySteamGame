import React, { Component } from 'react';
import './App.css';
import MyNavbar from './Component/Navbar/Navbar'
import {Route,  Switch} from 'react-router-dom'
import Gameinfo from './Container/Gameinfo/Gameinfo'
import Settings from './Container/Settings/Settings'
import Search from './Component/Basic/Search/Search'



class App extends Component {


  componentDidMount(){

  }
  render() {
    return (
      <div className="App">
        <MyNavbar/> 
        <Search/>
        <Switch>
          <Route path='/settings' component={Settings}></Route>
          <Route path='/'  component={Gameinfo} ></Route>
        </Switch>  
      </div>
    );
  }
}



export default App;

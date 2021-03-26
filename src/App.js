
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar'
import Content from './components/Content'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar /> 
        <Sidebar />
        <Content />
      </div>
    )
  }
}


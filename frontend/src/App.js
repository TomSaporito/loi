import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Table from './components/Table';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      utilities: [],
      ministries: [{}]
    };

    
  }

  componentDidMount(){
    fetch('/ministries')
    .then(res => res.json())
    .then(data => {
      this.setState({
        ministries: data.ministries,
        title: data.title,
        utilities: data.utilities
      });
    });
  }

  renderMinistriesHead(){
    console.log('rendering header')
    return Object.keys(this.state.ministries[0]).forEach((elem, key, _arr)=>{
      console.log(`the key is  ${elem}`);
      return(
        <th key={key}>
          {elem}
        </th>
      );
    });
  }

  
  render() {
    
    return (
      <div className="App">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>{this.state.title}</h1>
                </div>
                <div className="col-12">
                   <Table data={this.state.ministries} tableName="Ministries"/>
                </div>
                <div className="col-12">
                  <Table data={this.state.utilities} tableName="Utilities"/>
                </div>
                
            </div>
        </div>

      </div>
    );
  }
}

export default App;

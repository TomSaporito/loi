import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Table from './components/Table';
import Form from './components/Form';
import FormGroup from './components/FormGroup';
import CheckRadio from './components/CheckRadio';

const radios = {
  type: 'radio',
  name: 'resource_target',
  legend: 'Target',
  inputs: [
    {
      value: 'money',
      text: 'Money',
    },
    {
      value: 'labor',
      text: 'Labor',
    },
    {
      value: 'both',
      text: 'Both',
    },  {
      value: 'either',
      text: 'Either',
    }
  ]
};

const checkboxes = {
  type: 'checkbox',
  name: 'true_die_nums',
  legend: 'Die Numbers',
  inputs: [
    {
      value: 1,
      text: 1,
    },
    {
      value: 2,
      text: 2,
    },
    {
      value: 3,
      text: 3,
    },
    {
      value: 4,
      text: 4,
    },
    {
      value: 5,
      text: 5,
    },
    {
      value: 6,
      text: 6,
    }
  ]
};


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      utilities: [],
      ministries: [{}],
      cards: []
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

  onSubmitHandler = (e) => {
    e.preventDefault();
    alert('Bologna');
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
                  <Form method="POST" action="/card" onSubmitHandler={this.onSubmitHandler}>
                    
                    <div className="row">
                      <div className="col-md-4">
                        <FormGroup label="Amount">
                          <input required type="number" step="1" name="amount" className="form-control"/>
                        </FormGroup>
                      </div>
                      
                      
                      <div className="col-md-4">
                          <CheckRadio fields={radios}/>
                      </div>


                      <div className="col-md-4">
                        <CheckRadio fields={checkboxes}/>
                      </div>

                      <div className="col-md-4">
                        <FormGroup label="False Outcome">
                          <input type="number" step="1" name="falseOutcome" className="form-control" required/>
                        </FormGroup>
                      </div>

                      <div className="col-md-4">
                        <FormGroup label="True Outcome">
                          <input type="number" step="1" name="trueOutcome" className="form-control" required/>
                        </FormGroup>
                      </div>

                      <div className="col-md-4">
                        <FormGroup label="Card Description">
                          <textarea name="description" className="formControl"/>
                        </FormGroup>
                      </div>
                    </div>




                    <button type="submit">
                      Submit
                    </button>
                  </Form>
                </div>
                <div className="col-12">
                  <Table data={this.state.cards} tableName="Cards"></Table>
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

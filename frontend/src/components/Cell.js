import React, { Component } from 'react';

class Cell extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false
        }
    }
    handleBtn(){
        if (this.state.editing){
            fetch()
            .then()
            .then();
        }
        this.setState({editing: !this.state.editing});
    }

    handleTextChange(e){
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({
            [name]: value
        });
    }

    renderText(){

        if(this.state.editing){
            return <input type={typeof this.props.text == 'string'? 'text': 'number'} name={this.props.text} onChange={(e)=>this.handleTextChange(e)} value={this.state[this.props.text] || this.props.text}/>
        } else {
            return this.state[this.props.text] || this.props.text;
        }

    }
    render() {
        return (    
            <td>
                {this.renderText()}
                <button onClick={()=>this.handleBtn()} className="btn btn-sm" type="button">
                    <i className={this.state.editing? 'fas fa-sign-in-alt' :'far fa-edit'}></i>
                </button>  
            </td>
        );
    }
}

export default Cell;

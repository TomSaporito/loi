import React, { Component } from 'react';
import appState from '../appState';

class Cell extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false
        }
        
    }
    handleBtn(){
        this.setState({editing: !this.state.editing});
    }

    handleTextChange(e){
        console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({
            [name]: value
        }, ()=>{
            const payload = {};
            payload[this.props.cell]= this.state[this.props.cell];
            console.log(payload, this.state);
            
            fetch(`/${this.props.fetch.toLowerCase()}/${this.props.id}`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify({
                    [this.props.cell]: this.state[this.props.cell]
                }) 
            })
            .then(async (res)=>{
                const s = await res.json();
                appState.$emit('UPDATE_STATE', s);
            })
            .catch();
        });
    }

    renderText(){

        if(this.state.editing){
            return <input type={typeof this.props.text == 'string'? 'text': 'number'} onBlur={(e)=>this.handleTextChange(e)} name={this.props.cell} onChange={(e)=>this.handleTextChange(e)} value={this.state[this.props.cell] || this.props.text}/>
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

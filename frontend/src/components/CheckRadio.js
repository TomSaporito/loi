import React, { Component } from 'react';

class CheckRadio extends Component {
    
    render() {
        const inputs = this.props.fields.inputs.map((input)=>{
            return(
                <div className={this.props.fields.inline? 'form-check-inline': 'form-check'}>    
                    <input className="form-check-input" type={this.props.fields.type} name={this.props.fields.name} value={input.value}/>
                    <label className="form-check-label">
                        {input.text}
                    </label>
                </div>
            );
        });
        return (
            <fieldset>
                <legend>{this.props.fields.legend}</legend>
                {inputs}
            </fieldset>
        );
    }
}

export default CheckRadio;

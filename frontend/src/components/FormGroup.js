import React, { Component } from 'react';

class FormGroup extends Component {
    render() {
        return (
            <div className="form-group">
                <label>
                    {this.props.label}
                    {this.props.children}
                </label>
            </div>
        );
    }
}

export default FormGroup;
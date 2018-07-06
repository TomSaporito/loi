import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <form action={this.props.action} method={this.props.method} onSubmit={this.props.onSubmitHandler}>
                {this.props.children}
            </form>
        );
    }
}

export default Form;

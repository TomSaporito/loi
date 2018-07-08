import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

class Table extends Component {

    renderBody(){
        if(this.props.data){
            return (
                this.props.data.map((cell, i, arr)=>(
                    <Row key={i} table={this.props.tableName.toLowerCase()} isBody={true} cells={cell}/>
                )
            ));
        }
    }

    renderHeader(){
        if(this.props.data){
            return (
                <Row cells={this.props.data[0]}/> 
            );
        }
    }


    render() {
        const header = this.renderHeader();
        console.log(header);
        const rows = this.renderBody();
        return (
            <table className="table table-bordered table-striped">
                <caption>
                    {this.props.tableName}
                </caption>
                <thead>
                    {header}
                </thead>
                
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

// componentName.propTypes = {

// };

export default Table;
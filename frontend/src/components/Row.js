import React, { Component } from 'react';

class Row extends Component {
    render() {
        
        let cells;
        if(this.props.cells){
            cells = Object.keys(this.props.cells).map((elem, i, _arr)=>{
                if (this.props.isBody){
                    return(
                        <td key={i}>
                            {this.props.cells[elem]}
                        </td>
                    )
                } else {
                    return(
                        <th key={i}>
                            {elem}
                        </th>
                    );
                }
                
            });
        }
        return (
            <tr>
                {cells || null}
            </tr>
        );
    }
}

export default Row;

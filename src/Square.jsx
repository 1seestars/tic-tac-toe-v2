import React from 'react';
import { TableCell } from './styled/TableCell'
import { CellSign } from './styled/CellSign'

const Square = (props) => {
    let color
    if (props.value === "X") {
        color = 'rgb(73, 192, 137)'
    } else if (props.value === "O") {
       color = 'rgb(198, 92, 98)'
    } else {
        color = 'transparent'
    }
    return (
        <TableCell onClick={props.onClick} color={color}>
            <CellSign>{props.value}</CellSign>
        </TableCell>
    );
}

export default Square

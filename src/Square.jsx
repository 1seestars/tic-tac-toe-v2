import React from 'react';
import styled from "styled-components";

const TableCell = styled.td`
  width: 5rem;
  height: 5rem;
  background: transparent;
  cursor: pointer;
  color: ${props => props.color};
  border: 3px solid rgb(69,65,98);
  border-radius: 5px;
  text-align: center;
  font-size: ${props => props.color === 'transparent' ? "1rem" : "4rem"};
  outline: none;
  font-family: 'Comfortaa', cursive;
  transition: .3s;
`

const CellSign = styled.span`
    position: relative;
    top: .3rem;
`

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

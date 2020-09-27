import styled from 'styled-components'

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
import React from 'react'
import Square from "./Square";
import styled from "styled-components";

const Table = styled.table`
    margin: 0 auto 3rem;
    opacity: ${props => props.winner && '0.2'};
    transition: .5s;
`

class Board extends React.Component {
  renderSquare(i) {
      return (
        <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
    );
  }

  render() {
    return (
        <Table cellSpacing={"0"} winner={this.props.winner}>
            <tbody>
              <tr>
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
              </tr>
              <tr>
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
              </tr>
              <tr>
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
              </tr>
            </tbody>
        </Table>
    );
  }
}

export default Board
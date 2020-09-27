import React from 'react'
import Square from "./Square";
import { Table } from "./styled/Table"

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
        </Table>
    );
  }
}

export default Board
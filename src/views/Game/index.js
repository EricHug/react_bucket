import React from 'react'
import './index.less'

class Square extends React.Component{
    render(){
        return(
            <div className="square" onClick={()=>{this.props.onClick()}}>{this.props.value}</div>
        )
    }
}

class Board extends React.Component{
    renderSquare(i){
        return <Square value={this.props.squares[i]} onClick={()=>{this.props.onClick(i)}}/>
    }
    render(){
        const squares = this.props.squares
        return (
            <div>
                {
                    squares.map((item,index)=>{
                        return index%3===0?(<div key={index} className="board-row">
                        {this.renderSquare(index)}
                        {this.renderSquare(index+1)}
                        {this.renderSquare(index+2)}
                            </div>):null
                    })
                }
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.jumpTo = this.jumpTo.bind(this)
        this.state = {
            history:[
                {
                    squares: Array(9).fill(null),
                    xIsNext: true,
                    coordinate:'(0,0)'
                }
            ]
        }
    }
    handleClick(i){
        const history = this.state.history.slice()
        const squares = history[history.length-1]['squares'].slice()
        const xIsNext = history[history.length-1]['xIsNext']
        const coordinate = `(${calculateCoordinate(i)['col']},${calculateCoordinate(i)['row']})`
        if(calculateWinner(squares)||squares[i]){return}
        squares[i] = xIsNext ? 'X':'O'
        history.push({
            squares,
            xIsNext: !xIsNext,
            coordinate
        })
        this.setState({
            history
        })
    }
    jumpTo(i){
        const history = this.state.history.slice(0,i+1)
        this.setState({
            history
        })
    }
    render(){
        const history = this.state.history.slice()
        const squares = history[history.length-1]['squares']
        const xIsNext = history[history.length-1]['xIsNext']
        let status = ''
        if(calculateWinner(squares)){
            let winnerSquare = calculateWinner(squares)
            status = `Winner is ${winnerSquare}`
        }else if(history.length>9){
            status = `It's a draw`
        }else{
            status = `Next player: ${xIsNext?'X':'O'}`
        }
        return (
            <div className="game">
                <div className="game-board">
                <Board squares={squares} onClick={this.handleClick}/>
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{
                    history.map((item,index)=>{
                    return <li key={index}><button onClick={()=>{this.jumpTo(index)}}>Go to {index?'move #'+index:'game start'} Coordinate: {item.coordinate}</button></li>
                    })
                }</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function calculateCoordinate(i){
      return {
          col: i%3,
          row: Math.trunc(i/3)
      }
  }

export default Game
import * as React from 'react';
import { connect } from 'react-redux';

import './App.css';

import { reset, takeTurn } from './actions/gameActions';
import { GameState } from './reducers/game';

const GameBoard: React.SFC<{ board: string[], handleClick: (index: number) => void }> = ({ board, handleClick }) => (
  <div className="board">
    {board.map((cell, index) => {
      return <div key={index} onClick={() => handleClick(index)} className="square">{cell}</div>;
    })}
  </div>
);

const GameFooter: React.SFC<{ winner: string | null, resetFunction: Function }> = ({ winner, resetFunction}) => (
  <div>
    <h1>{'The winner is ' + winner}</h1>
    <div>
      <button onClick={() => resetFunction()}>Reset</button>
    </div>
  </div>
);

interface AppProps extends GameState {
  dispatch: Function;
}

class App extends React.Component<AppProps, GameState> {
  constructor(props: AppProps) {
    super(props);
  }

  componentWillMount() {
    this.handleReset();
  }

  handleClick(index: number) {
    this.props.dispatch(takeTurn(index));
  }

  handleReset() {
    this.props.dispatch(reset());
  }

  render() {
    const {board, winner} = this.props;

    return (
      <div className="app-container">
        <GameBoard board={board} handleClick={(index: number) => this.handleClick(index)} />

        {winner ? <GameFooter winner={winner} resetFunction={() => this.handleReset()} /> : null}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return state.game;
}

export default connect(mapStateToProps)(App as any);

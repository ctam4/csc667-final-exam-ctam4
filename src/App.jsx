import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import './App.css';

const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialArg);
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [playerId, setPlayerId] = useState(null);
  const [winner, setWinner] = useState(null);

  const play = async (position) => {
    if (playerId !== null) {
      try {
        const response = await Axios.get(`//${location.hostname}:5000/api/play?playerId=${playerId}&position=${position}`);
        if (response.status === 200) {
          setWinner(response.data.winner);
          setGameState(response.data.gameState);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const resetGame = async () => {
    if (playerId !== null) {
      try {
        const response = await Axios.get(`//${location.hostname}:5000/api/reset`);
        if (response.status === 200) {
          setPlayerId(null);
          setWinner(response.data.winner);
          setGameState(response.data.gameState);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const refresh = async () => {
    try {
      const response = await Axios.get(`//${location.hostname}:5000/api/refresh`);
      if (response.status === 200) {
        setWinner(response.data.winner);
        setGameState(response.data.gameState);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const switchPlayer = () => {
    if (gameState.every((item) => item === null)) {
      switch (playerId) {
        case 1:
          setPlayerId(2);
          break;
        case 2:
          setPlayerId(1);
          break;
        default:
          setPlayerId(1);
          break;
      }
    }
  }

  return (
    <div className="App">
      <button id="refresh" onClick={refresh}>Refresh</button>
      <button id="reset" onClick={resetGame}>Reset Game</button>
      <button id="switch" onClick={switchPlayer}>Switch Player</button>
      <h3 id="player">Player {playerId}</h3>
      {winner && <h4 id="winner">Winner: Player {winner}!</h4>}
      <div>
        <div className="board-row">
          <button id="box-0" className="square" onClick={() => play(0)}>
            {gameState[0]}
          </button>
          <button id="box-1" className="square" onClick={() => play(1)}>
            {gameState[1]}
          </button>
          <button id="box-2" className="square" onClick={() => play(2)}>
            {gameState[2]}
          </button>
        </div>
        <div className="board-row">
          <button id="box-3" className="square" onClick={() => play(3)}>
            {gameState[3]}
          </button>
          <button id="box-4" className="square" onClick={() => play(4)}>
            {gameState[4]}
          </button>
          <button id="box-5" className="square" onClick={() => play(5)}>
            {gameState[5]}
          </button>
        </div>
        <div className="board-row">
          <button id="box-6" className="square" onClick={() => play(6)}>
            {gameState[6]}
          </button>
          <button id="box-7" className="square" onClick={() => play(7)}>
            {gameState[7]}
          </button>
          <button id="box-8" className="square" onClick={() => play(8)}>
            {gameState[8]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

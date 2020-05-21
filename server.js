const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

const wss = new WebSocket.Server({ port: 4000 });

let gameState = Array(9).fill(null);
let winner = null;

app.get('/api/refresh', (req, res) => {
  res.json({ winner, gameState }).end();
});

app.get('/api/play', (req, res) => {
  if ('playerId' in req.query && 'position' in req.query) {
    const { playerId, position } = req.query;
    if (gameState[position] === null) {
      gameState[position] = playerId;
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          winner = gameState[a];
          break;
        }
      }
      res.json({ winner, gameState }).end();
    } else {
      res.sendStatus(406).end();
    }
  } else {
    res.sendStatus(400).end();
  }
});

app.get('/api/reset', (req, res) => {
  winner = null;
  gameState = Array(9).fill(null);
  res.json({ winner, gameState }).end();
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

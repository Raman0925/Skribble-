const { redisConnect } = require('../config/redis');
const redisClient = redisConnect();
const wordToGuess = require('../utils/wordToGuess');

const nextRound = (socket) => {
    socket.on('next_round', (gameId) => {
      redisClient.get(gameId, (err, data) => {
        if (err || !data) {
          socket.emit('error', 'Game not found');
          return;
        }
        const gameSession = JSON.parse(data);
        gameSession.currentRound = ++gameSession.currentRound ;
        for(let index = 0;index<players.length;index++){
            gameSession.currentPlayer = gameSession.players[index].role!=drawer?gameSession.players[index]:socket.emit("error","Start Game again")
        }
        const nextDrawerIndex = 0;
        
        gameSession.currentWord = wordToGuess();
        redisClient.setex(gameId, 7200, JSON.stringify(gameSession), (err) => {
          if (err) socket.emit('error', 'Error updating game state');
        });
        socket.to(gameId).emit('new_round', {
          currentPlayer: gameSession.currentPlayer.name,
          currentRound: gameSession.currentRound,
        });
      });
    });
  };
  module.exports ={nextRound}
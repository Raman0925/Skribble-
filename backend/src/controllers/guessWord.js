const { redisConnect } = require('../config/redis');
const redisClient = redisConnect();

const guessWord = (socket) => {
    socket.on('guess_word', ({ gameId, playerId, guess }) => {
      redisClient.get(gameId, (err, data) => {
        if (err || !data) {
          socket.emit('error', 'Game not found');
          return;
        }
        const gameSession = JSON.parse(data);
        if (gameSession.currentWord.toLowerCase() === guess.toLowerCase()) {
          gameSession.scores[playerId] += 10; // Example scoring
          socket.to(gameId).emit('guess_correct', { playerId, guess });
        } else {
          socket.to(gameId).emit('guess_incorrect', { playerId, guess });
        }
        redisClient.setex(gameId, 7200, JSON.stringify(gameSession), (err) => {
          if (err) socket.emit('error', 'Error updating game state');
        });
      });
    });
  };
  module.exports = {guessWord}
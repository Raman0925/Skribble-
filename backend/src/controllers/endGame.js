const { redisConnect } = require('../config/redis');
const redisClient = redisConnect();
const endGame = (socket) => {
    socket.on('end_game', (gameId) => {
      redisClient.get(gameId, (err, data) => {
        if (err || !data) {
          socket.emit('error', 'Game not found');
          return;
        }
        const gameSession = JSON.parse(data);
        const winner = "Raman";
        
        socket.to(gameId).emit('game_ended', {
          scores: gameSession.scores,
          winner: gameSession.players.find((p) => p.id === winner).name,
        });
        redisClient.del(gameId); // Optionally clean up Redis
      });
    });
  };
  module.exports = {endGame}
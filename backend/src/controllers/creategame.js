const { redisConnect } = require('../config/redis');
const redisClient = redisConnect();
const uuid = require('uuid');

const createGame = (socket) =>{
  
socket.on( "Create_Game",   (playerName) => {
  const gameId = uuid.v4(); 
  console.log(gameId)
  const gameData = {
    players: [{ id: socket.id, name: playerName,creator:true }], 
    gameStarted: false,
    currentRound: 0,
    scores: { [socket.id]: 0 }, 
    totalRound:4,
    totalTIme:60
  };
   console.log(gameId)
   console.log(gameData)
   socket.emit('gameCreated', { gameId })
  
  redisClient.setex(gameId,  JSON.stringify(gameData), (err) => {
    if (err) {
      console.error('Error saving game to Redis:', err);
      socket.emit('error', 'Failed to create game');
      return;
    }

    
    socket.emit('gameCreated', { gameId });
  });
}
)}

module.exports = { createGame };

const { redisConnect } = require('../config/redis');
const redisClient = redisConnect();

const joinGame = (io) => {
  io.on('join_game', (gameId, playerName,socketId) => {
    console.log('Joining Game by ', playerName);
    redisClient.get(gameId, (err, data) => {
      if (err) {
        console.error('error in getting data', err);
        io.emit('error', 'error joining the game');
        return;
      }
      if(!data){
        io.emit('error',"Game not found");
      }
      const gameSession = JSON.parse(data);
      gameSession.players.push({id:socketId,name:playerName,})
      redisClient.setex(gameId, 7200, JSON.stringify(gameSession),(err,reply)=>{
      if(err){
         io.emit('error','Failed to join the game')
      }
      io.to(gameId).emit('game_update', `${playerName} has joined the game!`);
       io.join(gameId);
       io.emit('game_update','welcome to the game')
      })
    });
  });
};

module.exports = { joinGame };

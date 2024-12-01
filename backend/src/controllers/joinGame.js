const { redisConnect } = require('../config/redis');
const redisClient = redisConnect();

const joinGame = (socket) => {
  socket.on('join_game', (gameId, playerName,socketId) => {
    console.log('Joining Game by ', playerName);
    redisClient.get(gameId, (err, data) => {
      if (err) {
        console.error('error in getting data', err);
        socket.emit('error', 'error joining the game');
        return;
      }
      if(!data){
        socket.emit('error',"Game not found");
      }
      const gameSession = JSON.parse(data);
      gameSession.players.push({id:socketId,name:playerName,creator:false})
      redisClient.setex(gameId, 7200, JSON.stringify(gameSession),(err,reply)=>{
      if(err){
         socket.emit('error','Failed to join the game')
      }
      socket.join(gameId);

      io.to(gameId).emit('game_update', `${playerName} has joined the game!`);
       socket.emit('game_update','welcome to the game')
      })
    });
  });
};

module.exports = { joinGame };

const { redisConnect } = require('../config/redis');
const redisClient = redisConnect();

const startDrawing = (socket) => {
    socket.on("Start_Drawing",(gameId)=>{
        redisClient.get(gameId, (err, data) => {
            if (err || !data) {
                socket.emit("error", "Error game not found");
                return;
            }
            const gameSession = JSON.parse(data);
            socket.to(gameId).emit("Start_Drawing", {
                drawer: gameSession.currentPlayer.name, 
                word: gameSession.currentWord

         } )

         redisClient.setex(gameId, 7200, JSON.stringify(gameSession), (err) => {
            if (err) {
                socket.emit("error", "Error saving game state");
            }
        });
            
    })


})
   
};

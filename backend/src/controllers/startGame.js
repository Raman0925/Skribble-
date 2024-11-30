const { redisConnect } = require('../config/redis');
const redisClient = redisConnect();
const wordToGuess = require('../utils/wordToGuess');

const startGame = (socket) => {
    socket.on('start_game', (gameId) => {
        redisClient.get(gameId, (err, data) => {
            if (err) {
                socket.emit('error', 'Error starting the game');
                return;
            }
            socket.join(gameId);  // Using socket.join instead of io.join
            if (!data) {
                socket.emit('error', 'Game not found');
                return;
            }
            const gameSession = JSON.parse(data);
            //Task to create a generate random number function to get the word from array.
           
           gameSession.currentRound = 1;

           gameSession.currentWord = wordToGuess();
           gameSession.players[0].role = 'drawer';
           gameSession.currentplayer= gameSession.players[0]
           //Task for checking player and mputting their turn


            if (gameSession.players.length <= 1) {
                socket.emit('error', "Need more than one player to start");
                return;
            }

            gameSession.gameStarted = true;
            redisClient.setex(gameId, 7200, JSON.stringify(gameSession), (err) => {
                if (err) {
                    socket.emit('error', 'Error saving game state');
                    return;
                }
                socket.to(gameId).emit('game_started', 'The game has started!');
            });
        });
    });
};

module.exports = { startGame};
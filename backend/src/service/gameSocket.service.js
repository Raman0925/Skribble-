const { Server } = require('socket.io');

let instance = null;

const GameSocketService = (httpServer) => {
  if (instance) {
    return instance;
  }

     try{
        const io = new Server(httpServer,
         {
            cors: {
               origin: "*", // adjust this for production
               methods: ["GET", "POST"]
             }
       
         }
        );
        instance = io;
        return instance;
     }catch(error){
        throw new Error("Failed to initalize socketio",error)
     }

}
module.exports  = {GameSocketService};
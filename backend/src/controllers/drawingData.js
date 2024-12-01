
const drawingData = () => {
    socket.on("draw/command", (commands) => {
    console.log(commands)
    socket.broadcast.emit("draw/command", commands)
  })}
module.exports = {drawingData};
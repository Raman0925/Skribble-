const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";
let mousepressed = false;
const socket = io("http://localhost:3000");
socket.on("connect", () => {
  document
    .getElementById("message-Container")
    .append((createElement("div").textContent = `${socket.id}`));
});
const inputNameHandler = (event) => {
  event.preventDefault();
  const playerName = document.getElementById("inputBoxName").value;
};

const mouseDownHandler = (event) => {
  event.preventDefault();
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);

  mousepressed = true;
};

const mouseUpHandler = (event) => {
  event.preventDefault();
  let mousepressed = false;
};
const mouseMoveHandler = (event) => {
  event.preventDefault();
  if (mousepressed === true) {
    ctx.lineTo(event.offsetX, event.offsetY);

    ctx.stroke();
  }
};



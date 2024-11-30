import { io } from "socket.io-client";
const socket = io("http://127:0:0:1:3000");

const startGame = (event) => {
  event.preventDefault();

  const playerName = document.getElementById("playerName").value.trim();

  if (!playerName) {
    const msg = document.getElementById("msg");
    msg.textContent = "please Enter your Name";
    msg.style.color = "red";
    msg.style.fontWeight = "bold";
    return;
  }
  socket.emit("Create_Game", playerName);
};
socket.on("gameCreated", (data) => {
  const { gameId } = data;

  const gameIdDisplay = document.getElementById("msg");
  gameIdDisplay.textContent = `Game created successfully! Game ID: ${gameId}`;
});

socket.on("error", (errorMessage) => {
  alert(`Error: ${errorMessage}`);
});

document.getElementById("createGame").addEventListener("click", () => {
  showPage("createPage");
});

document.getElementById("joinGame").addEventListener("click", () => {
  showPage("joinPage");
});

document.getElementById("backToHome").addEventListener("click", () => {
  showPage("homepage");
});

document.getElementById("backToHomeJoin").addEventListener("click", () => {
  showPage("homepage");
});

function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((page) => page.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}
document.getElementById("startGame").addEventListener("click", startGame);

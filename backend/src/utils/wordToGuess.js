const {words} = require('./constant');
const generateWordForGuess = () => {
     const index = Math.floor(Math.random()*words.length);
     return words[index];
}
module.exports = {generateWordForGuess};
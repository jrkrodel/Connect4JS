import gameBoard from "./board.js";
import gameManager from "./gameManager.js";
import Player from "./player.js";

//Get Game Area
const gameArea = document.getElementById("gameArea");

//Create game state manager
const manager = new gameManager();

//Create board
const board = new gameBoard(gameArea);

//Generate players
const player = new Player();

//Start game
manager.initGame(player, board);

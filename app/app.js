import GameBoard from "./Board.js";
import GameManager from "./GameManager.js";
import Player from "./player.js";

//Get Game Area
const gameArea = document.getElementById("gameArea");

//Create game state manager
const manager = new GameManager();

//Create board
const board = new GameBoard(gameArea);

//Generate players
const player = new Player();

//Start game
manager.initGame(player, board);

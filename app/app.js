import GameBoard from "./Board.js";
import GameManager from "./GameManager.js";
import Player from "./Player.js";

//Get Game Area from DOM
const gameArea = document.getElementById("gameArea");

//Create GameManager, is in charge of changing visual game state, player turns, etc
const manager = new GameManager();

//Create board, has win check methods and board data
const board = new GameBoard(gameArea);

//Generate player, holds method to take a turn
const player = new Player();

//Start game with the player and the board
manager.initGame(player, board);

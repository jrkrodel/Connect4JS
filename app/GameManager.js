export default class GameManager {
  constructor() {
    this.currentTurn = "yellow";
  }

  //Start game, add event listeners for move previews and button clicks
  initGame(player, board) {
    //Call board method to generate the board
    board.generateBoard();
    //Add listener to reset button
    const reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
      //Call reset method, pass in the board object
      this.resetGame(board);
    });
    //Loop through the entire board
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        //Get each potential space on the board
        const button = document.getElementById(`${col}-${row}`);
        //Get the move preview row
        const movePreview = document.getElementById("move-" + col);

        //Add event listener to the button on mouse hover
        button.addEventListener("mouseenter", (e) => {
          //If game is not tied or won, show preview of move with a token above the currently hovered col
          if (board.isWon === true || board.isTied === true) {
            movePreview.setAttribute("fill", "#ddd");
            return;
          } else {
            movePreview.setAttribute("fill", this.currentTurn);
          }
        });

        //Add listener when the mouse exits the currently hovered col, clear move preview for that col
        button.addEventListener("mouseleave", (e) => {
          movePreview.setAttribute("fill", "#ddd");
        });

        //Add listener for when the mouse clicks on any button on the board
        button.addEventListener("click", () => {
          //Get the top most space's fill in the selected col
          const lastCircle = document
            .getElementById(`${col}-0`)
            .getAttribute("fill");
          //If the board is already won or tied, return
          if (board.isWon === true || board.isTied === true) {
            return;
          } else {
            //If the top space is still empty
            if (lastCircle === "#ddd") {
              //Take a turn
              player.takeTurn(col, this.currentTurn, board);
              //If the current board state is won or tied, clear the move preview and start animation
              if (board.isWon === true) {
                this.displayWinner(this.currentTurn);
                movePreview.setAttribute("fill", "#ddd");
              } else if (board.isTied === true) {
                this.displayTie();
                movePreview.setAttribute("fill", "#ddd");
              } else {
                //If game is not won or tied, switch turns and update move preview
                this.switchTurns(this.currentTurn);
                movePreview.setAttribute("fill", this.currentTurn);
              }
            }
          }
        });
      }
    }
  }

  //Display winner animation once board as reached a winning state
  displayWinner(winner) {
    const win = document.getElementById("win-screen");
    win.style.display = "block";
    win.style.backgroundColor = winner;
    const reset = document.getElementById("reset");
    reset.style.display = "block";
  }

  //display tie animation if board as reached a tied state
  displayTie() {
    const tie = document.getElementById("tie-screen");
    tie.style.display = "block";
    const reset = document.getElementById("reset");
    reset.style.display = "block";
  }

  //Switch turn from yellow to red/red to yellow
  switchTurns() {
    if (this.currentTurn === "yellow") {
      this.currentTurn = "red";
    } else {
      this.currentTurn = "yellow";
    }
  }

  //Reset board back to starting state, removing any win animations from board spaces
  resetGame(board) {
    board.clearBoard();
    const win = document.getElementById("win-screen");
    win.style.display = "none";
    const tie = document.getElementById("tie-screen");
    tie.style.display = "none";
    const reset = document.getElementById("reset");
    reset.style.display = "none";
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        const token = document.getElementById(`${c}-${r}`);
        token.classList.remove("show-winning-yellow");
        token.classList.remove("show-winning-red");
      }
    }
  }
}

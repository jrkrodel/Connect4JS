export default class gameManager {
  constructor() {
    this.currentTurn = "yellow";
  }

  //Start game, add event listeners for movie previews and button clicks
  //Adds checks to know if the board has reached a win or tie state
  initGame(player, board) {
    board.generateBoard();
    const reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
      this.resetGame(board);
    });
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        const button = document.getElementById(`${col}-${row}`);
        const movePreview = document.getElementById("move-" + col);

        button.addEventListener("mouseenter", (e) => {
          if (board.isWon === true || board.isTied === true) {
            movePreview.setAttribute("fill", "#ddd");
            return;
          } else {
            movePreview.setAttribute("fill", this.currentTurn);
          }
        });
        button.addEventListener("mouseleave", (e) => {
          if (board.isWon === true || board.isTied === true) {
            movePreview.setAttribute("fill", "#ddd");
            return;
          } else {
            movePreview.setAttribute("fill", "#ddd");
          }
        });

        button.addEventListener("click", () => {
          const lastCircle = document
            .getElementById(`${col}-0`)
            .getAttribute("fill");
          if (board.isWon === true || board.isTied === true) {
            console.log("Reset game?");
          } else {
            if (lastCircle === "#ddd") {
              player.takeTurn(col, this.currentTurn, board);
              if (board.isWon === true) {
                this.displayWinner(this.currentTurn);
                movePreview.setAttribute("fill", "#ddd");
              } else {
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
  displayerTie() {}

  //Switch turn from yellow to red/red to yellow
  switchTurns() {
    if (this.currentTurn === "yellow") {
      this.currentTurn = "red";
    } else {
      this.currentTurn = "yellow";
    }
  }

  //Reset board back to starting state, removing any win animations
  resetGame(board) {
    board.clearBoard();
    const win = document.getElementById("win-screen");
    win.style.display = "none";
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

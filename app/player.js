export default class player {
  //Place a token into the next empty space on the board in the select column
  //Need to check if there is a winner after token is played
  takeTurn(col, currentTurn, board) {
    for (let row = 0; row < 6; row++) {
      const boardSpace = document.getElementById(`${col}-${row}`);
      const nextSpace = document.getElementById(`${col}-${row + 1}`);
      if (nextSpace?.getAttribute("fill") !== "#ddd") {
        if (boardSpace.getAttribute("fill") === "#ddd") {
          boardSpace.setAttribute("fill", currentTurn);
          board.updateBoard(currentTurn, col, row);
          board.checkWinner(currentTurn, col, row);
        } else {
          return;
        }
      }
    }
  }
}

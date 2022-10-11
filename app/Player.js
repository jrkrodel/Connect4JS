export default class Player {
  //Place a token into the next empty space on the board in the select column
  //Need to check if there is a winner after token is played
  takeTurn(col, currentTurn, board) {
    for (let row = 0; row < 6; row++) {
      //Get next boardSpace to check
      const boardSpace = document.getElementById(`${col}-${row}`);
      //Get the space below the boardSpace
      const nextSpace = document.getElementById(`${col}-${row + 1}`);
      //If the next space is not empty
      if (nextSpace?.getAttribute("fill") !== "#ddd") {
        //If the boardSpace is empty
        if (boardSpace.getAttribute("fill") === "#ddd") {
          //Fill the given boardSpace with the correct token color
          boardSpace.setAttribute("fill", currentTurn);
          //Update the board data
          board.updateBoard(currentTurn, col, row);
          //Check for tie
          board.checkTie();
          //Check for winner
          board.checkWinner(currentTurn, col, row);
        } else {
          //If the board space is already taken and is the last space do nothing
          return;
        }
      }
    }
  }
}

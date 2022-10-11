export default class GameBoard {
  constructor(gameArea) {
    //The gameArea to generate the board
    this.gameArea = gameArea;
    //The board data
    this.board = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
    //Win state
    this.isWon = false;
    //Tie state
    this.isTied = false;
  }

  //Generate SVGs of board
  generateBoard() {
    //Loop to genereate both col and rows
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 7; row++) {
        //First create row of circles we will use to showcase move previews
        if (row === 0) {
          let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          circle.classList.add("preview");
          circle.setAttribute("cx", 40 + 80 * col);
          circle.setAttribute("cy", 40 + row);
          circle.setAttribute("id", "move-" + col);
          circle.setAttribute("fill", "#ddd");
          this.gameArea.append(circle);
        } else {
          //Else create needed rectangle and circle SVGS to visually display game board
          let rectangle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          circle.classList.add("circle");
          circle.setAttribute("id", `${col}-${row - 1}`);
          circle.setAttribute("cx", 42 + col * 79);
          circle.setAttribute("cy", 120 + (row - 1) * 80);
          circle.setAttribute("fill", "#ddd");
          rectangle.classList.add("rectangle");
          rectangle.setAttribute("x", 80 * col);
          rectangle.setAttribute("id", `rect-${col}-${row - 1}`);
          rectangle.setAttribute("y", 80 + 80 * (row - 1));
          this.gameArea.append(rectangle);
          this.gameArea.append(circle);
        }
      }
    }
  }

  //Update data of board
  updateBoard(player, col, row) {
    //Get the select col and the given row and update board data with the string that matches the
    //color of the played token
    this.board[row][col] = player;
  }

  //clear board (both visually and data)
  clearBoard() {
    //Loop through each svg and add animation
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        const circle = document.getElementById(`${c}-${r}`);
        const rect = document.getElementById(`rect-${c}-${r}`);
        circle.classList.add("drop");
        rect.classList.add("drop");
        setTimeout(() => {
          circle.setAttribute("fill", "#ddd");
        }, "350");

        //At the end of the animation remove the animation class
        circle.addEventListener("animationend", (event) => {
          event.target.classList.remove("drop");
        });
        rect.addEventListener("animationend", (event) => {
          event.target.classList.remove("drop");
        });

        //Update win and tied state
        this.isWon = false;
        this.isTied = false;
      }
    }
    //Update board data
    this.board = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
  }

  //helper function to add animation to winning tokens
  //Takes the color of the winning tokens and a array of the winning tokens DOM elements
  animateTokens(player, tokens) {
    //if the winning color is yellow add the yellow winning animation
    if (player === "yellow") {
      tokens.forEach((token) => {
        token.classList.add("show-winning-yellow");
      });
    }
    //if the winning color is red add the red winning animation
    if (player === "red") {
      tokens.forEach((token) => {
        token.classList.add("show-winning-red");
      });
    }
  }

  //to get the current boardstate and check it in game manager
  checkWinner(player, col, row) {
    //Seperate helper functions for win checks
    this.checkH(player, row);
    this.checkV(player, col, row);
    this.checkDiagonalLeft(player, col, row);
    this.checkDiagonalRight(player, col, row);
  }

  //check if the board is in tie state
  checkTie() {
    const tokens = [];
    //Loop through the netire board
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        let token = this.board[row][col];
        //If a given space on the board is empty, push it to the array tokens
        if (token === "") tokens.push(token);
      }
    }
    //If tokens is equal to 0 and we still have not won, that means all spaces are taken and it is a tie
    if (tokens.length === 0 && this.isWon === false) {
      this.isTied = true;
    }
  }

  //Same comments as above (horizontal win check)
  checkH(player, row) {
    //Get the row to check, the row the token was placed into
    let rowToCheck = this.board[row];
    let count = 1;
    let winningTokens = [];
    //Loop through the given row
    for (let i = 0; i <= rowToCheck.length; i++) {
      //If one token in the row matches the token next to it, and matches the last played token
      //Add to count and push both tokens into array of winning tokens
      //Else we reset count and array of winning tokens
      if (rowToCheck[i] === rowToCheck[i + 1] && rowToCheck[i] === player) {
        count++;
        winningTokens.push(i);
        winningTokens.push(i + 1);
      } else if (count !== 4 && count < 4) {
        winningTokens = [];
        count = 1;
      }
    }
    //If count is 4 or greater, get the winning tokens and add animations and set win state to true
    if (count === 4 || count > 4) {
      if (player === "yellow")
        winningTokens.forEach((col) => {
          document
            .getElementById(`${col}-${row}`)
            .classList.add("show-winning-yellow");
        });
      if (player === "red")
        winningTokens.forEach((col) => {
          document
            .getElementById(`${col}-${row}`)
            .classList.add("show-winning-red");
        });
      this.isWon = true;
    }
  }

  //Same comments as above (vertical win check)
  checkV(player, col, row) {
    let count = 1;
    //Loop through each row
    for (let r = 5; r > 0; r--) {
      //Player plays a token into a given col, check the selected col from the last row up
      //if two matching tokens are in a row and both are the same color of the last played token
      //add to count, else set count back to 1
      if (
        this.board[r][col] === this.board[r - 1][col] &&
        this.board[r][col] === player
      ) {
        count++;
      } else if (count !== 4 && count < 4) {
        count = 1;
      }
    }
    //If count is greater than or equal to 4 we have a winner
    if (count === 4 || count > 4) {
      const tokens = [];
      //Push winning tokens into an array
      for (let i = 0; i <= 3; i++) {
        tokens.push(document.getElementById(`${col}-${row + i}`));
      }
      //Animate tokens
      this.animateTokens(player, tokens);
      //Set win state to true
      this.isWon = true;
    }
  }

  //Diagonal win check, where the low point is on the left and high point is on the right
  checkDiagonalRight(player, col, row) {
    //We first check if row - 3 exists
    if (this.board[row - 3] !== undefined) {
      //Check if there is a matching digonal from bottom to top
      if (
        this.board[row][col] === this.board[row - 1][col + 1] &&
        this.board[row][col] === this.board[row - 2][col + 2] &&
        this.board[row][col] === this.board[row - 3][col + 3] &&
        this.board[row][col] === player
      ) {
        //Push winning tokens into an array and animate tokens, set win state to true
        const tokens = [];
        for (let i = 0; i <= 3; i++) {
          tokens.push(document.getElementById(`${col + i}-${row - i}`));
        }
        this.animateTokens(player, tokens);
        this.isWon = true;
      }
    }
    //First check if row + 3 exist
    if (this.board[row + 3] !== undefined) {
      //check if there is a matching diagonal from top to bottom
      if (
        this.board[row][col] === this.board[row + 1][col - 1] &&
        this.board[row][col] === this.board[row + 2][col - 2] &&
        this.board[row][col] === this.board[row + 3][col - 3] &&
        this.board[row][col] === player
      ) {
        //Push winning tokens into an array and animate tokens, set win state to true
        const tokens = [];
        for (let i = 0; i <= 3; i++) {
          tokens.push(document.getElementById(`${col - i}-${row + i}`));
        }
        this.animateTokens(player, tokens);
        this.isWon = true;
      }
    }
  }

  //Diagonal win check where the low point is on the right and the high point is on the left
  checkDiagonalLeft(player, col, row) {
    //Check if there is a diagonal starting from bottom to top
    if (this.board[row - 3] !== undefined) {
      if (
        this.board[row][col] === this.board[row - 1][col - 1] &&
        this.board[row][col] === this.board[row - 2][col - 2] &&
        this.board[row][col] === this.board[row - 3][col - 3] &&
        this.board[row][col] === player
      ) {
        //Push winning tokens into an array and animate tokens, set win state to true
        const tokens = [];
        for (let i = 0; i <= 3; i++) {
          tokens.push(document.getElementById(`${col - i}-${row - i}`));
        }
        this.animateTokens(player, tokens);
        this.isWon = true;
      }
    }
    //Check if there is a diagonal starting from top to bottom
    if (this.board[row + 3] !== undefined) {
      if (
        this.board[row][col] === this.board[row + 1][col + 1] &&
        this.board[row][col] === this.board[row + 2][col + 2] &&
        this.board[row][col] === this.board[row + 3][col + 3] &&
        this.board[row][col] === player
      ) {
        //Push winning tokens into an array and animate tokens, set win state to true
        const tokens = [];
        for (let i = 0; i <= 3; i++) {
          tokens.push(document.getElementById(`${col + i}-${row + i}`));
        }
        this.animateTokens(player, tokens);
        this.isWon = true;
      }
    }
  }
}

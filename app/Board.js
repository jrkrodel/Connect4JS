export default class GameBoard {
  constructor(gameArea) {
    this.gameArea = gameArea;
    this.board = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
    this.isWon = false;
    this.isTied = false;
  }

  //Generate SVGs of board
  generateBoard() {
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 7; row++) {
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
    this.board[row][col] = player;
  }

  //clear board (both visually and data)
  clearBoard() {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        const circle = document.getElementById(`${c}-${r}`);
        const rect = document.getElementById(`rect-${c}-${r}`);
        circle.classList.add("drop");
        rect.classList.add("drop");
        setTimeout(() => {
          circle.setAttribute("fill", "#ddd");
        }, "350");
        circle.addEventListener("animationend", (event) => {
          event.target.classList.remove("drop");
        });
        rect.addEventListener("animationend", (event) => {
          event.target.classList.remove("drop");
        });
        this.isWon = false;
      }
    }
    this.board = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
  }

  //function to add animation to winning tokens
  animateTokens(player, tokens) {
    if (player === "yellow") {
      tokens.forEach((token) => {
        token.classList.add("show-winning-yellow");
      });
    }
    if (player === "red") {
      tokens.forEach((token) => {
        token.classList.add("show-winning-red");
      });
    }
  }

  //Check winner within board? Maybe find a way to do this is game manager, can maybe just have a method
  //to get the current boardstate and check it in game manager
  checkWinner(player, col, row) {
    this.checkH(player, row);
    this.checkV(player, col, row);
    this.checkDiagonalLeft(player, col, row);
    this.checkDiagonalRight(player, col, row);
  }

  //Same comments as above (horizontal win check)
  checkH(player, row) {
    let rowToCheck = this.board[row];
    let count = 1;
    let winningTokens = [];
    for (let i = 0; i <= rowToCheck.length; i++) {
      if (rowToCheck[i] === rowToCheck[i + 1] && rowToCheck[i] === player) {
        count++;
        winningTokens.push(i);
        winningTokens.push(i + 1);
      } else if (count !== 4 && count < 4) {
        winningTokens = [];
        count = 1;
      }
    }
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
    for (let r = 5; r > 0; r--) {
      if (
        this.board[r][col] === this.board[r - 1][col] &&
        this.board[r][col] === player
      ) {
        count++;
      } else if (count !== 4 && count < 4) {
        count = 1;
      }
    }
    if (count === 4 || count > 4) {
      const tokens = [];
      for (let i = 0; i <= 3; i++) {
        tokens.push(document.getElementById(`${col}-${row + i}`));
      }
      this.animateTokens(player, tokens);
      this.isWon = true;
    }
  }

  //Diagonal win check, where the low point is on the left and high point is on the right
  checkDiagonalRight(player, col, row) {
    if (this.board[row - 3] !== undefined) {
      if (
        this.board[row][col] === this.board[row - 1][col + 1] &&
        this.board[row][col] === this.board[row - 2][col + 2] &&
        this.board[row][col] === this.board[row - 3][col + 3] &&
        this.board[row][col] === player
      ) {
        const tokens = [];
        for (let i = 0; i <= 3; i++) {
          tokens.push(document.getElementById(`${col + i}-${row - i}`));
        }
        this.animateTokens(player, tokens);
        this.isWon = true;
      }
    }
    if (this.board[row + 3] !== undefined) {
      if (
        this.board[row][col] === this.board[row + 1][col - 1] &&
        this.board[row][col] === this.board[row + 2][col - 2] &&
        this.board[row][col] === this.board[row + 3][col - 3] &&
        this.board[row][col] === player
      ) {
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
    if (this.board[row - 3] !== undefined) {
      if (
        this.board[row][col] === this.board[row - 1][col - 1] &&
        this.board[row][col] === this.board[row - 2][col - 2] &&
        this.board[row][col] === this.board[row - 3][col - 3] &&
        this.board[row][col] === player
      ) {
        const tokens = [];
        for (let i = 0; i <= 3; i++) {
          tokens.push(document.getElementById(`${col - i}-${row - i}`));
        }
        this.animateTokens(player, tokens);
        this.isWon = true;
      }
    }
    if (this.board[row + 3] !== undefined) {
      if (
        this.board[row][col] === this.board[row + 1][col + 1] &&
        this.board[row][col] === this.board[row + 2][col + 2] &&
        this.board[row][col] === this.board[row + 3][col + 3] &&
        this.board[row][col] === player
      ) {
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


class MultiplayerSudokuGame {
  constructor(board, players) {
    this.players = players;
    this.board = board;
    this.currentPlayerIndex = 0;
  }
  makeMove(row, col, value) {
    if (this.board[row][col] !== 0) {
      return `Cell (${row}, ${col}) is already filled.`;
    }
    this.board[row][col] = value;
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    return `Player ${this.players[this.currentPlayerIndex]} made a move at (${row}, ${col}) with value ${value}.`;
  }
  checkWinner() {
    // Logic to check if the current board state has a winner
    // This is a placeholder for actual Sudoku winning logic
    return this.board.flat().every(cell => cell !== 0) ? `Player ${this.players[this.currentPlayerIndex]} wins!` : null;
  }
}


let board = Array(9).fill().map(() => Array(9).fill(0));
let players = ["Alice", "Bob"];
let game = new MultiplayerSudokuGame(board, players);
console.log(game.makeMove(0, 0, 5)); // Player Bob made a move at (0, 0) with value 5.
console.log(game.makeMove(0, 0, 3)); // Cell (0, 0) is already filled.
console.log(game.makeMove(0, 1, 3)); // Player Alice made a move at (0, 1) with value 3.
console.log(game.checkWinner()); // null
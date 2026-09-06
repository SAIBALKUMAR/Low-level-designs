
class BookMyShow {
  constructor(rows, cols) {
    this.seats = Array(rows).fill().map(() => Array(cols).fill(false));
  }

  bookSeat(row, col) { 
    if (this.seats[row][col]) {
      return false;
    }
    this.seats[row][col] = true;
    return true;
  }

  cancelBooking(row, col) {
    if (this.seats[row][col]) {
      return false;
    }
    this.seats[row][col] = false;
    return true;
  }
}
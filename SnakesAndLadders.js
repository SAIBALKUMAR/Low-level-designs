
class SnakesAndLadders {
    constructor(size, snakes, ladders) {
        this.size = size;
        this.board = new Array( size * size + 1).fill(0);
        snakes.forEach(([start, end]) => {
        this.board[start] = end;
        });
        ladders.forEach(([start, end]) => {
        this.board[start] = end;
        });
        this.players = [];
        this.positions = {};
    }

    addPlayer(player) {
        this.players.push(player);
        this.positions[player] = 1; // All players start at position 1
    }

    playTurn(player, roll) {
        if (!this.players.includes(player)) {
            return `Player ${player} is not in the game.`;
        }
        const next = this.positions[player] + roll;
        if (next > this.size * this.size) {
            return `Player ${player} rolled ${roll} but cannot move beyond the board.`;
        }

        this.positions[player] = this.board[next] || next; // Move to the next position or follow snake/ladder
        if (this.positions[player] === this.size * this.size) {
            return `Player ${player} rolled ${roll} and won the game!`;
        }
        return `Player ${player} rolled ${roll} and moved to position ${this.positions[player]}.`;
    }
}


const snakes = [[16, 6], [47, 26], [49, 11], [56, 53], [62, 19], [64, 60], [87, 24], [93, 73], [95, 75], [98, 78]];
const ladders = [[1, 38], [4, 14], [9, 31], [21, 42], [28, 84], [36, 44], [51, 67], [71, 91], [80, 100]];

const game = new SnakesAndLadders(10, snakes, ladders);
game.addPlayer("Alice");
game.addPlayer("Bob");  

console.log(game.playTurn("Alice", 4)); // Player Alice rolled 4 and moved to position 5.
console.log(game.playTurn("Bob", 6));   
console.log(game.playTurn("Alice", 2)); // Player Alice rolled 2 and moved to position 7.
console.log(game.playTurn("Bob", 3));



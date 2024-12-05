const fs = require('fs');

function countXMAS(grid) {
    const word = "XMAS";
    const wordLen = word.length;
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    // Define all possible directions
    const directions = [
        [0, 1],   // Right
        [1, 0],   // Down
        [1, 1],   // Down-Right
        [1, -1],  // Down-Left
        [0, -1],  // Left
        [-1, 0],  // Up
        [-1, -1], // Up-Left
        [-1, 1]   // Up-Right
    ];

    // Helper function to check for the word in a specific direction
    function checkDirection(x, y, dx, dy) {
        for (let i = 0; i < wordLen; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[nx][ny] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    // Traverse the grid and look for the word in all directions
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (grid[x][y] === 'X') {
                for (const [dx, dy] of directions) {
                    if (checkDirection(x, y, dx, dy)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}

function countXMAS2(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    // Helper function to check if "MAS" is valid in any order
    function isMAS(str) {
        return str === "MAS" || str === "SAM";
    }

    // Check for X-MAS patterns in the grid
    for (let x = 0; x < rows-2; x++) {
        for (let y = 0; y < cols-2; y++) {
            // Check the pattern with x in the center
            const x1 = grid[x][y]+grid[x+1][y+1]+grid[x+2][y+2]
            const x2 = grid[x][y+2]+grid[x+1][y+1]+grid[x+2][y]

            // Check for "MAS" in the top-down direction
            if (isMAS(x1)) {
                // Check for "MAS" in the left-right direction
                if (isMAS(x2)) {
                    count++;
                }
            }
        }
    }

    return count;
}
function getSolution1(input) {
    return countXMAS(input)
}

function getSolution2(input) {
    return countXMAS2(input)
}
if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8')
            .trim()
            .split("\n")
            .map(line => line.split(""));
console.log(`Solution 1 = ${getSolution1(input)}`);
console.log(`Solution 2 = ${getSolution2(input)}`);

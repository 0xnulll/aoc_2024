const fs = require('fs');

const directions = [
    { dx: -1, dy: 0 }, // Up
    { dx: 0, dy: 1 },  // Right
    { dx: 1, dy: 0 },  // Down
    { dx: 0, dy: -1 }  // Left
];

function getInitialPos(map) {
    let x, y;
    for (let i = 0; i < map.length; i++) {
        // console.log(map[i])
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === '^') {
                x = i;
                y = j;
                break;
            }
        }
    }
    return {x,y}
}

function getSolution1(map) {
    const rows = map.length;
    const cols = map[0].length;
    let dirIndex = 0; // Start facing up
    let visited = new Set();
    let { x, y } = getInitialPos(map);
    
    while (x >= 0 && x < rows && y >= 0 && y < cols) {
        // Mark current position as visited
        visited.add(`${x},${y}`);

        const nextX = x + directions[dirIndex].dx;
        const nextY = y + directions[dirIndex].dy;

        if (!(nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols)) {
            break
        }
        if (  map[nextX][nextY] !== '#') {
            x = nextX;
            y = nextY;
        } else {
            dirIndex = (dirIndex + 1) % 4;
        }  
    }
    return visited.size;
}

function getSolution2(map) {
    const rows = map.length;
    const cols = map[0].length;
    let count = 0;
    let {x:xx,y:yy } = getInitialPos(map);
    
    function checkCycle() { 
        let visited = new Set();
        let x = xx;
        let y = yy;
        let dirIndex = 0;
        while (x >= 0 && x < rows && y >= 0 && y < cols) {
            // Mark current position as visited
            const state = `${x},${y},${dirIndex}`;
            if (visited.has(state)) {
                return true;
            }
            visited.add(state);
          
            const nextX = x + directions[dirIndex].dx;
            const nextY = y + directions[dirIndex].dy;
    
            if (!(nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols)) {
                // going out of boundary
                break
            }
            if (
                map[nextX][nextY] !== '#'
            ) {
                x = nextX;
                y = nextY;           
            } else {
                // Turn right if obstacle
                dirIndex = (dirIndex + 1) % 4;
            }
        }
        return false;
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] == ".") {
                map[i][j] = "#"
                if (checkCycle()) {
                    count++;
                }
                 map[i][j] = "."
            }
        }
    }
    return count
}

if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8')
const res = getSolution1(input.split("\n"))
console.log(`Solution 1 = ${res}`);
console.log(`Solution 2 = ${getSolution2(input.split("\n").map((t)=>{return t.split("")}))}`);

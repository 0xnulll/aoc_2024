const fs = require('fs');

const directions = [
    [0, 1],   // Right
    [1, 0],   // Down
    [0, -1],  // Left
    [-1, 0],  // Up
];

function countTrails(map, x, y) {
    // Create a visited set to track positions we've already seen
    // const visited = new Set();
    const reacableSet = new Set();
    const distinctTrail = new Set();

    function dfs(currX, currY, prevHeight, trail) {
        // Convert position to string for visited set
        const pos = `${currX},${currY}`;    
        // Base cases
        
        if (currX < 0 || currX >= map.length || currY < 0 || currY >= map[0].length) {
            return; // Out of bounds
        }
        if (Number(map[currX][currY]) - prevHeight !== 1) {
            return 
        }
        const newTrail = `${trail}|${pos}`;
        // if (visited.has(pos)) {
            // return; // Already visited (avoid cycles)
        // }
        if (map[currX][currY] == '.') {
            return; // Hit a wall or obstacle
        }
        if (map[currX][currY] == '9') {
            reacableSet.add(pos)
            distinctTrail.add(newTrail)
        }
        // Mark current position as visited
        // visited.add(pos);
        
        // Try all four directions
        for (const [dx, dy] of directions) {
            const nextX = currX + dx;
            const nextY = currY + dy;
            
            dfs(nextX, nextY, Number(map[currX][currY]),newTrail)
        }
    } 
    
    dfs(x, y, -1, "")
    console.log(distinctTrail)
    return [reacableSet.size,distinctTrail.size];
}

function findAllTrailHead(map) {
    const result = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '0') {
                result.push([i, j]);
            }
        }
    }
    return result;
}

function getSolution(map) {
    const allTrailheads = findAllTrailHead(map);
    let ans1 = 0, ans2 = 0;
    allTrailheads.map((pos) => {
        console
        const res = countTrails(map, pos[0], pos[1])
        ans1 += res[0]
        ans2 += res[1]
    })
    return [ans1,ans2]
}



if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8').split("\n")
console.log(`Solution 1 = ${getSolution(input)}`);
// console.log(`Solution 1 = ${getSolution2(input)}`);

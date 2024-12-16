const fs = require("fs")
const inputFile = process.argv[2];

// p=0,4 v=3,-3
// p=6,3 v=-1,-3
function parseLines(lines) {
    return lines.map(line => {
        // Extract numbers using regex
        const [x, y, vx, vy] = line.match(/-?\d+/g).map(Number);
        
        return {
            position: { x, y },
            velocity: { vx, vy }
        };
    });
}

function getSafetyFactor(robots,rows,cols) {
    const midRow = Math.floor(rows / 2);
    const midCol = Math.floor(cols / 2);
    
    // Initialize counters for each quadrant
    let quadrants = [0, 0, 0, 0]; // [topLeft, topRight, bottomLeft, bottomRight]
    
    // Count robots in each quadrant
    for (const robot of robots) {
        const { x, y } = robot;
        if (y < midCol) {
            // Top half
            if (x < midRow) {
                quadrants[0]++; // Top-left
            }else if(x > midRow) {
                quadrants[1]++; // Top-right
            }
        } else if(y > midCol) {
            // Bottom half
            if (x < midRow) {
                quadrants[2]++; // Bottom-left
            }else if(x > midRow) {
                quadrants[3]++; // Bottom-right
            }
        }
    }   
    // Calculate safety factor (multiply all quadrant counts)
    return quadrants.reduce((acc, count) => acc * count, 1);
}

function getSolution(input, steps, rows, cols) {
    const newPositions = input.map((p) => {
        let x = (p.position.x + p.velocity.vx * steps) % rows
        let y = (p.position.y + p.velocity.vy * steps) % cols
        if (x < 0) {
            x = rows + x
        } else if (x > rows) {
            x = x - rows
        }
        if (y < 0) {
            y = cols + y
        } else if (y > cols) {
            x = y - cols
        }
        return {x,y}
    })
    // printRobots(newPositions, 101, 103);
    return getSafetyFactor(newPositions, rows, cols)
}

// [{
//     position: { x, y },
//     velocity: { vx, vy }
// }];
function countComponents(posList) {
    // Create a visited map to track which positions we've seen
    const visited = new Set();
    let components = 0;
    
    // Helper function for DFS
    function dfs(pos) {
        const key = `${pos.x},${pos.y}`;
        if (visited.has(key)) return;
        
        visited.add(key);
        
        // Check all adjacent positions (including diagonals)
        for (const neighbor of posList) {
            const neighborKey = `${neighbor.x},${neighbor.y}`;
            if (visited.has(neighborKey)) continue;
            
            // Check if positions are adjacent (including diagonals)
            const dx = Math.abs(neighbor.x - pos.x);
            const dy = Math.abs(neighbor.y - pos.y);
            
            // If positions are adjacent (including diagonals)
            if (dx <= 1 && dy <= 1) {
                dfs(neighbor);
            }
        }
    }
    
    // Iterate through all positions
    for (const pos of posList) {
        const key = `${pos.x},${pos.y}`;
        if (!visited.has(key)) {
            components++;
            dfs(pos);
        }
    }
    
    return components;
}
function getSolution2(input, rows, cols) {
    let mincompCount = 999999999;
    let resultSeconds = 0
    for (let seconds = 0; seconds < rows*cols; ++seconds){
        const newPosisiton = input.map((p) => {
            let x = (p.position.x + p.velocity.vx * seconds) % rows
            let y = (p.position.y + p.velocity.vy * seconds) % cols
            if (x < 0) {
                x = rows + x
            } else if (x > rows) {
                x = x - rows
            }
            if (y < 0) {
                y = cols + y
            } else if (y > cols) {
                x = y - cols
            }
            return {x,y}
        })
        let compCocount = countComponents(newPosisiton);
        if (compCocount < mincompCount) {
            mincompCount = compCocount;
            resultSeconds = seconds;
        }
    }
    return resultSeconds
    
    
}
function printRobots(input, rows, cols) {
    let map = [];
    for (let i = 0; i < rows; ++i){
        map[i]=[]
        for (let k = 0; k < cols; ++k){
            map[i][k] = " ";
        }
    }
    input.forEach((p)=>{
        map[p.x][p.y] = ".";
    })
    for (let i = 0; i < rows; ++i) {
        console.log(map[i].join(""));
    }
}

let input = fs.readFileSync(inputFile, 'utf-8')
            .trim()
    .split("\n")
input = parseLines(input);
console.log(`Solution 1 = ${getSolution(input, 6285, 101, 103)}`);
// A connected group of robots will have minimum distinct components
console.log(`Solution 2 = ${getSolution2(input, 101, 103)}`);

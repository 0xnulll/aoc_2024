const fs = require("fs")
const inputFile = process.argv[2];

// Define all possible directions
const directionsMap = {
    "<": [0, -1],   // Left
    "v": [1, 0],   // Down
    ">": [0, 1],  //Right 
    "^" : [-1, 0]   //Up
};

function moveBox(matrix, pos, direction) {
    
    let newX = pos[0]
    let newY = pos[1]
    while (matrix[newX][newY] == "O" ) {
        newX = newX + direction[0];
        newY = newY + direction[1];
    }
    if (matrix[newX][newY] == ".") {
        // if space
        matrix[pos[0]][pos[1]] = "."
        matrix[newX][newY] = "O"
        return true
    }
    else if (matrix[newX][newY] == "#") {
        return false
    }
}

function getSumOfGps(matrix) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 'O' || matrix[i][j] == "[") {
                sum += 100 * i + j
            }
        }
    }
    return sum
}

function getRobotPos(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '@') {
                return [i, j];
            }
        }
    }
}

function getSolution(matrix, moves) {
    let robotPos = getRobotPos(matrix);

    for (let i = 0; i < moves.length; ++i){
        const direction = directionsMap[moves[i]];
        const newX = robotPos[0] + direction[0];
        const newY = robotPos[1] + direction[1];

        const newVal = matrix[newX][newY];
        if (newVal == ".") {
            matrix[robotPos[0]][robotPos[1]] = "."
            // move robot
            robotPos = [newX, newY]
            matrix[robotPos[0]][robotPos[1]] = "@"
            
        } else if (newVal == "#") {
            // do nothing
        } else if (newVal == "O") {
            const boxMoved = moveBox(matrix,[newX, newY], direction);
            if (boxMoved) {
                matrix[robotPos[0]][robotPos[1]] = "."
                // move robot
                robotPos = [newX, newY]
                matrix[robotPos[0]][robotPos[1]] = "@"
            }
        }
    }
    return getSumOfGps(matrix);
}

function printMatrix(matrix) {
    matrix.forEach((m) => {
        console.log(m.join(""));
    })
}
// []@.
function moveBox2(matrix, pos, direction, move, prev) {
    
    const newX = pos[0] + direction[0];
    const newY = pos[1] + direction[1];
    
    if (move == "<" || move == ">") {
        if (["[", "]"].includes(matrix[newX][newY])) {
            const flag = moveBox2(matrix, [newX, newY], direction, move, matrix[newX][newY]);
            if (flag) {
                matrix[newX][newY] = prev
            }
            return flag
        } else if (matrix[newX][newY] == ".") {
            matrix[newX][newY] = prev;
            return true;
        }
        
        return false;
    } else if (move == "^" || move == "v") {
        let toCheck = [];
        let toMove = new Set();
        if (matrix[newX][newY] == "[") {
            toCheck.push([newX,newY])
        }
        if (matrix[newX][newY] == "]") {
            toCheck.push([newX,newY-1])
        }
        while (toCheck.length) {
            const newPos = toCheck.pop();
            toMove.add(newPos.join(","))
            const newX = newPos[0] + direction[0];
            const newY = newPos[1] + direction[1];
        
            if (matrix[newX][newY] == "[") {
                toCheck.push([newX, newY]);
                
            }
            if (matrix[newX][newY] == "]") {
                toCheck.push([newX, newY - 1]);
            }
            if (matrix[newX][newY + 1] == "[")
            {
                toCheck.push([newX, newY+1]);
            }
            if (matrix[newX][newY] == "#" || matrix[newX][newY + 1] == "#"){
                return false;
            }
        }
        toMove = [...toMove].map((pos)=>pos.split(",").map(Number)).sort((a,b)=>(a[0]-b[0])*direction[0])
        if (toMove.length) {
            while (toMove.length) {
                const pos = toMove.pop()
                matrix[pos[0] + direction[0]][pos[1] + direction[1]] = matrix[pos[0]][pos[1]]
                matrix[pos[0]][pos[1]] = "."
                matrix[pos[0] + direction[0]][pos[1] + 1] = matrix[pos[0]][pos[1] + 1]
                matrix[pos[0]][pos[1] + 1] = "."
            }
            return true;
        }

    }
    return false
}


function getSolution2(matrix, moves) {
    let robotPos = getRobotPos(matrix);

    for (let i = 0; i < moves.length; ++i){
        const direction = directionsMap[moves[i]];
        const newX = robotPos[0] + direction[0];
        const newY = robotPos[1] + direction[1];

        const newVal = matrix[newX][newY];
        if (newVal == ".") {
            matrix[robotPos[0]][robotPos[1]] = "."
            // move robot
            robotPos = [newX, newY]
            matrix[robotPos[0]][robotPos[1]] = "@"
            
        } else if (newVal == "#") {
            // do nothing
        } else if (newVal == "[" || newVal == "]") {
            const boxMoved = moveBox2(matrix, robotPos, direction, moves[i], ".");
            
            if (boxMoved) {
                matrix[robotPos[0]][robotPos[1]] = "."
                // move robot
                robotPos = [newX, newY]
                matrix[robotPos[0]][robotPos[1]] = "@"
            }
        }
    }
    return getSumOfGps(matrix);
}

let input = fs.readFileSync(inputFile, 'utf-8')
            .trim()
    .split("\n\n")
const matrix = input[0].split("\n").map((m) => m.split(""));
let moves = input[1].split("\n").join("")

let newMatrix = [];
for (let i = 0; i < matrix.length; i++) {
    newMatrix[i] = [];
    for (let j = 0; j < matrix[i].length; j++) {
        switch (matrix[i][j]) {
            case "#": newMatrix[i].push("#"); newMatrix[i].push("#"); break;
            case "O": newMatrix[i].push("["); newMatrix[i].push("]"); break;
            case ".": newMatrix[i].push("."); newMatrix[i].push("."); break;
            case "@": newMatrix[i].push("@"); newMatrix[i].push("."); break;
        }
    }
}     
console.log(`Solution 2 = ${getSolution(matrix, moves)}`);
console.log(`Solution 2 = ${getSolution2(newMatrix, moves)}`);
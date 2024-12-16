const fs = require("fs")
const inputFile = process.argv[2];

//Button A: X+94, Y+34
//Button B: X+22, Y+67
//Prize: X=8400, Y=5400
function parseLines(input_strs) {
    return input_strs.map((input_str)=>{
    // Regular expressions to match the patterns
    const buttonAMatch = input_str.match(/Button A: X\+(\d+), Y\+(\d+)/);
    const buttonBMatch = input_str.match(/Button B: X\+(\d+), Y\+(\d+)/);
    const prizeMatch = input_str.match(/Prize: X=(\d+), Y=(\d+)/);

    // Extract values
    const buttonA = {
            x: parseInt(buttonAMatch[1]),
            y: parseInt(buttonAMatch[2])
    };

    const buttonB = {
            x: parseInt(buttonBMatch[1]),
            y: parseInt(buttonBMatch[2])
    };

    // For part 2 add or remove 10000000000000
    const prize = {
        x: 10000000000000 + parseInt(prizeMatch[1]),
        y: 10000000000000 + parseInt(prizeMatch[2])
    };

        return [buttonA, buttonB, prize];
    })
}
// 94x+22y =8400
// 34x+67y = 5400
function solve(a1,b1,c1,a2,b2,c2) {
    // Using Cramer's Rule
    // D = a1*b2 - a2*b1
    const D = (a1 * b2) - (a2 * b1);
    
    // Dx = c1*b2 - c2*b1
    const Dx = (c1 * b2) - (c2 * b1);
    
    // Dy = a1*c2 - a2*c1
    const Dy = (a1 * c2) - (a2 * c1);
    
    // x = Dx/D, y = Dy/D
    const x = Dx/D;
    const y = Dy/D;
    
    // Check if x and y are whole numbers
    if (Number.isInteger(x) && Number.isInteger(y)) {
        return {
            x: x,
            y: y
        };
    }
    return false
}
function getSolution(inputs) {
    let result = 0;
    inputs.forEach((game) => {
        const ans = solve(game[0].x, game[1].x, game[2].x, game[0].y, game[1].y, game[2].y)
        // for part 2 add or remove 100 check
        if (ans) {
            result += ans.x * 3 + ans.y
        }
    })
    return result
}


let input = fs.readFileSync(inputFile, 'utf-8')
            .trim()
    .split("\n\n")
input = parseLines(input);
console.log(`Solution 1 = ${getSolution(input)}`);

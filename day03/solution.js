const fs = require('fs');

const regex = /mul\((\d+),\s*(\d+)\)/g;
const regex2 = /(mul\((\d+),\s*(\d+)\))|(do\(\))|(don't\(\))/g;
function getSolution1(input) {
    const matched = [...input.matchAll(regex)];
    let total = 0;
    for (item of matched) {
        const n1 = parseInt(item[1]); // First number
        const n2 = parseInt(item[2]); // Second number
        total += n1 * n2;
    }
    return total;
}

function getSolution2(input) {
    const matched = [...input.matchAll(regex2)];
    let total = 0;
    let flag = true

    for (item of matched) {
        const n1 = parseInt(item[2]); // First number
        const n2 = parseInt(item[3]); // Second number
        if (item[0] == "do()") {
            flag = true
        }
        else if (item[0] == "don't()") {
            flag = false
        }
        else if(flag)
            total += n1 * n2;
    }
    return total;
}
if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8')
console.log(`Solution 1 = ${getSolution1(input)}`);
console.log(`Solution 2 = ${getSolution2(input)}`);

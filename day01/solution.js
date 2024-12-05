const fs = require('fs');

function getSolution1(input) {
    const arr1 = [];
    const arr2 = [];
    let total = 0;
    for (const [n1, n2] of input) {
        arr1.push(n1);
        arr2.push(n2);
    }
    arr1.sort(); arr2.sort();
    for (let i = 0; i < arr1.length; i++) {
        total += Math.abs(arr1[i] - arr2[i]);
    }
    return total;
}

function getSolution2(input) {
    let arr1 = [];
    let arr2 = [];
    let total = 0;
    const counter = {};
    for (const [n1, n2] of input) {
        arr1.push(n1);
        arr2.push(n2);
    }
    arr2.forEach(num => {
        counter[num] = (counter[num] || 0) + 1;
    });
    for (const n1 of arr1) {
        total += n1 * (counter[n1] || 0);
    }
    return total;
}

if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8')
    .trim()
    .split("\n")
    .map(line => line.split("   ").map((t)=>parseInt(t)));

console.log(`Solution 1 = ${getSolution1(input)}`);
console.log(`Solution 2 = ${getSolution2(input)}`);

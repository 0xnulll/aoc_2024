const fs = require('fs');

const isSubset = (ss,allowVal)=>Array.from(ss).every(value => allowVal.includes(value));

function isSafe(arr, condition2 = false) {
    let set = new Set();
    let isSafeBool = isSubset(set, [1, 2, 3]) || isSubset(set, [-1, -2, -3])

    for (let i = 0; i < arr.length - 1; ++i) {
        set.add(arr[i + 1] - arr[i]);
    }
    if (isSafeBool) {
        return isSafeBool
    } else {
        if (condition2) {
            for (let i = 0; i < arr.length; ++i) {
                let newArr = [...arr];
                newArr.splice(i, 1);
                if (isSafe(newArr)) {
                    return true
                }
            }
        }
        return false;
    }
}

function getSolution1(input) {
    let safe_count = 0;

    for (item of input) {
        let isSafeBool = isSafe(item)
        if (isSafeBool) {
            safe_count += 1;
        }
    }
    
    return safe_count;
}

function getSolution2(input) {
    let safe_count = 0;

    for (item of input) {
        let isSafeBool = isSafe(item,true)
        if (isSafeBool) {
            safe_count += 1;
        }
    }
    
    return safe_count;
}
if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8')
    .trim()
    .split("\n")
    .map(line => line.split(" ").map((t) => { return parseInt(t.trim()) }));

console.log(`Solution 1 = ${getSolution1(input)}`);
console.log(`Solution 2 = ${getSolution2(input)}`);

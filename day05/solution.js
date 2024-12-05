const fs = require('fs');

function getSolution1(input) {
    return countXMAS(input)
}

// n1 < n2;
function isBigger(n1, n2, rules) {
    if (rules[n1]) {
        return rules[n1].has(n2);
    }
    return false;
}

function isUpdateOrdered(update, rules) {

    for (let i = 0; i < update.length-1; ++i){
        if (!isBigger(update[i], update[i + 1],rules))
            return false;
    }
    return true;
}

function reOrderPage(update, rules) {
    update.sort((a, b) => {
        if (isBigger(a, b, rules))
            return 1;
        else
            return -1
    })
    return update
}


function findMiddleElement(update) {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
}

function solve(rules, updates) {
    let sumOfMiddlePages1 = 0;
    let sumOfMiddlePages2 = 0;

    for (const update of updates) {
        if (isUpdateOrdered(update, rules)) {
            sumOfMiddlePages1 += findMiddleElement(update);
        } else {
            sumOfMiddlePages2 += findMiddleElement(reOrderPage(update, rules));
        }
    }
    return {sumOfMiddlePages1, sumOfMiddlePages2};
}

if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8')
const [rulesSection, updatesSection] = input.split("\n\n");
const rules = rulesSection.split("\n").map(rule => rule.split("|").map(Number)).reduce((p, c) => {
    if (p[c[0]])
        p[c[0]].add(c[1])
    else
        p[c[0]] = new Set([c[1]])
    return p
}, {})
const updates = updatesSection.split("\n").map(update => update.split(",").map(Number));
const res = solve(rules, updates)
console.log(`Solution 1 = ${res.sumOfMiddlePages1}`);
console.log(`Solution 2 = ${res.sumOfMiddlePages2}`);

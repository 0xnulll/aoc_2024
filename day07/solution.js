const fs = require('fs');
function getSolution1(testCases) {
    function evaluate(numbers, target) {
        const n = numbers.length;

        const totalOperators = n - 1;
        const totalCombinations = Math.pow(2, totalOperators); // 2 operators (+, *)
        for (let combination = 0; combination < totalCombinations; combination++) {
            let result = numbers[0];
            let currentCombination = combination;

            for (let i = 0; i < totalOperators; i++) {
                const operator = currentCombination % 2; // 0 for +, 1 for *
                currentCombination = Math.floor(currentCombination / 2);

                if (operator === 0) {
                    result += numbers[i + 1];
                } else {
                    result *= numbers[i + 1];
                }
            }

            // Check if this combination matches the target
            if (result === target) {
                return true;
            }
        }

        return false;
    }

    // Calculate the total calibration result
    let totalCalibrationResult = 0;

    for (const testCase of testCases) {
        if (evaluate(testCase.numbers, testCase.target)) {
            totalCalibrationResult += testCase.target;
        }
    }

    return totalCalibrationResult;
}

function getSolution2(testCases) {
    function evaluate(numbers, target) {
        const n = numbers.length;

        
        const totalOperators = n - 1;
        const totalCombinations = Math.pow(3, totalOperators); // 3 operators (+, *, ||)
        for (let combination = 0; combination < totalCombinations; combination++) {
            let result = numbers[0];
            let currentCombination = combination;

            for (let i = 0; i < totalOperators; i++) {
                const operator = currentCombination % 3; 
                currentCombination = Math.floor(currentCombination / 3);

                if (operator === 0) {
                    result += numbers[i + 1];
                } else if (operator === 1) {
                    result *= numbers[i + 1];
                } else if (operator === 2) {
                    result = parseInt(`${result}${numbers[i + 1]}`, 10);
                }
            }

            if (result === target) {
                return true;
            }
        }

        return false;
    }

    // Calculate the total calibration result
    let totalCalibrationResult = 0;

    for (const testCase of testCases) {
        if (evaluate(testCase.numbers, testCase.target)) {
            totalCalibrationResult += testCase.target;
        }
    }

    return totalCalibrationResult;
}

if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8')
const testCases = input.split("\n").map(line => {
    const [target, numbers] = line.split(":");
    return {
        target: parseInt(target.trim(), 10),
        numbers: numbers.trim().split(" ").map(n => parseInt(n, 10)),
    };
});
console.log(`Solution 1 = ${getSolution1(testCases)}`);
console.log(`Solution 1 = ${getSolution2(testCases)}`);

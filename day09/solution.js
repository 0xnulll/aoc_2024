const fs = require('fs');

function getCheckSum(disk) {
    let res = 0;
    for (let i = 0; i < disk.length; ++i){
        if(disk[i]!=".")
            res += i * disk[i]  
    }
    return res 
}

function getSolution1(text) {
    let disk = []
    let totalFiles = 0;
    // Disk Creation
    for (let i = 0; i < text.length; ++i){
        if (i % 2 == 0) {
            for (let k = 0; k < Number(text[i]); ++k){
                disk.push(totalFiles)
            }
            totalFiles++;
        } else {
            for (let k = 0; k < Number(text[i]); ++k){
                disk.push(".")
            }
        }

    }
    let leftSpaceIndx = 0, rightFileIdx = disk.length - 1;
    // Traversing from outer to inner side
    while(leftSpaceIndx<rightFileIdx){
        if(disk[leftSpaceIndx] === "." && disk[rightFileIdx] != ".") {
            disk[leftSpaceIndx] = disk[rightFileIdx];
            disk[rightFileIdx] = "."
            rightFileIdx--;
            leftSpaceIndx++;
        }
        while (disk[leftSpaceIndx] != ".") {
            leftSpaceIndx ++
        }
        while (disk[rightFileIdx] === ".") {
            rightFileIdx --
        }
    }
   return getCheckSum(disk)
}

function getSolution2(text) {
    let disk = []
    let totalFiles = 0;
    let freeSpaceIndex = []
    // Disk Creation
    for (let i = 0; i < text.length; ++i){
        if (i % 2 == 0) {
            for (let k = 0; k < Number(text[i]); ++k){
                disk.push(totalFiles)
            }
            totalFiles++;
        } else {
            // A index of free space
            let t = Number(text[i])
            freeSpaceIndex.push([t,disk.length])
            for (let k = 0; k < t; ++k){
                disk.push(".")
            }
        }
    }
    let fileIndex = disk.length - 1
    for (let cuurentFileCntr = totalFiles-1; cuurentFileCntr >= 0;--cuurentFileCntr)
    {
        while (disk[fileIndex] != cuurentFileCntr) {
            fileIndex--
        }
        let size = 1;
        while (disk[fileIndex - 1] == disk[fileIndex]) {
            fileIndex--;
            size++;
        }
        for (let i = 0; i < freeSpaceIndex.length; ++i) {
            // Check space in left most side
            if (freeSpaceIndex[i][0] >= size && fileIndex>freeSpaceIndex[i][1]) {
                
                for (let k = 0; k < size; ++k) {
                    disk[freeSpaceIndex[i][1] + k] = disk[fileIndex + k]
                    disk[fileIndex + k] = "."
                }
                freeSpaceIndex[i] = [freeSpaceIndex[i][0] - size, freeSpaceIndex[i][1] + size]
                break;
            }
        }
        
    }
    return getCheckSum(disk);
}

if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8')
console.log(`Solution 1 = ${getSolution1(input)}`);
console.log(`Solution 1 = ${getSolution2(input)}`);

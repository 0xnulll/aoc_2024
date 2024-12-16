const fs = require('fs');

// returns 
// dict of alphanumeric key with there posistion in a map

function getAllAntenna(map) {
    const antennaPositions = {};

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            const char = map[row][col];
            // Check if character is alphanumeric
            if (/[a-zA-Z0-9]/.test(char)) {
                if(antennaPositions[char])
                    antennaPositions[char].push([row, col]);
                else
                antennaPositions[char] = [[row, col]]
            }
        }
    }
    
    return antennaPositions;
}
function isPosInsideMap(map, x, y) {
    return x >= 0 && x < map.length && y >= 0 && y < map[0].length
}
// returns position of antinode in same line having one antinode is twice as far away as the other 
function getAntinodePos(ant1, ant2) {
    const rowDiff = ant2[0] - ant1[0];
    const colDiff = ant2[1] - ant1[1];

    // Calculate two possible antinode positions (2x distance in both directions)
    const pos1 = [
        ant1[0] - rowDiff, // twice the distance beyond ant2
        ant1[1] - colDiff
    ];
    
    const pos2 = [
        ant2[0] + rowDiff, // twice the distance beyond ant1
        ant2[1] + colDiff
    ];
    
    return [pos1, pos2];
}
// return all permutation combination of position set
function getAllPermuationOfPos(positions) {
    const pairs = [];
    
    // Loop through each position
    for (let i = 0; i < positions.length; i++) {
        // For each position, pair it with all subsequent positions
        for (let j = i + 1; j < positions.length; j++) {
            pairs.push([positions[i], positions[j]]);
        }
    }
    
    return pairs;
}



// returns position of antinode in same line having one antinode is twice as far away as the other 
function getAntinodePoss2(map,ant1, ant2) {
    const rowDiff = ant2[0] - ant1[0];
    const colDiff = ant2[1] - ant1[1];
    let step = 1;
    let AllPoss = [ant1]
    while (true) {
        const pos = [
            ant1[0] - step*rowDiff, // twice the distance beyond ant2
            ant1[1] - step*colDiff
        ];
        if (isPosInsideMap(map,pos[0], pos[1])) {
            AllPoss.push(pos)
        } else {
            break;
        }
        step++;
    }
    step = 1
    while (true) {
        const pos = [
            ant1[0] + step*rowDiff, // twice the distance beyond ant2
            ant1[1] + step*colDiff
        ];
        if (isPosInsideMap(map,pos[0], pos[1])) {
            AllPoss.push(pos)
        } else {
            break;
        }
        step++;
    }
    console.log(ant1,ant2,AllPoss)
    return AllPoss;
}

function getSolution1(map) {
    const antennas = getAllAntenna(map)
    let allAntinodePositions = []
    Object.keys(antennas).forEach((antennaFreq) => {
        const allPossiblePairs = getAllPermuationOfPos(antennas[antennaFreq])
        allAntinodePositions.push(allPossiblePairs.map((pairs) => getAntinodePos(pairs[0], pairs[1]) ).flat().filter((pos) => 
            isPosInsideMap(map, pos[0],pos[1])
        ).map((pos)=>pos.join(",")))
    })
    return new Set(allAntinodePositions.flat()).size
}

function getSolution2(map) {
    const antennas = getAllAntenna(map)
    let allAntinodePositions = []
    Object.keys(antennas).forEach((antennaFreq) => {
        const allPossiblePairs = getAllPermuationOfPos(antennas[antennaFreq])
        allAntinodePositions.push(allPossiblePairs.map((pairs) => getAntinodePoss2(map,pairs[0], pairs[1]) ).flat().map((pos)=>pos.join(",")))
    })
    return new Set(allAntinodePositions.flat()).size
}



if (process.argv.length < 3) {
    console.log("Please enter input file in argument");
    process.exit(1);
}

const inputFile = process.argv[2];
const input = fs.readFileSync(inputFile, 'utf-8').split("\n")
console.log(`Solution 1 = ${getSolution1(input)}`);
console.log(`Solution 2 = ${getSolution2(input)}`);

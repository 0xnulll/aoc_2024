let memo = {}
function getSolution(stones, blinks) {
    if (blinks === 0) {
        return stones.length;
    }
    let totalStones=0;
    for (const origStone of stones) {
        let stone = origStone
        const key = `${origStone},${blinks}`
        let noOfStones=0
        if (memo[key]) {
            noOfStones=memo[key];
        } else {
            let newStones = [];
            if (stone === 0) {
                newStones.push(1);
            }
            else if (stone.toString().length % 2 === 0)
            {
                const digits = stone.toString();
                const mid = Math.floor(digits.length / 2);
                const left = parseInt(digits.slice(0, mid), 10);
                const right = parseInt(digits.slice(mid), 10);
                newStones.push(left, right);
            } else {
                newStones.push(stone * 2024);
            }
            noOfStones = getSolution(newStones, blinks - 1);
            memo[key] = noOfStones
        }
        totalStones += noOfStones;
    }
    return totalStones;
  }
  
const initialArrangement1 = [125, 17];
const initialArrangement2 = [6563348,67,395,0,6,4425,89567,739318]
const blinks = 75;
console.log(`Number of stones after ${blinks} blinks:`, getSolution(initialArrangement2, blinks));
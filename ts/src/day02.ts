import { readFileSync } from "fs";

function getInput() {
    const input = readFileSync("./src/inputs/day02.txt", "utf8");
    return input.split("\n").filter(line => line.length > 0);
}

type Counts = { [key: string]: number }

export function part1() {
    const input = getInput();
    let twoLetter = 0;
    let threeLetter = 0;
    input.map(line => {
        let counts: Counts = {};
        line.split("").map(char => {
            if (counts[char] === undefined) {
                counts[char] = 1;
            } else {
                counts[char] += 1;
            }
        });
        let hasTwo = false;
        let hasThree = false;
        for (let char in counts) {
            if (counts[char] == 3) {
                hasThree = true;
            }
            if (counts[char] == 2) {
                hasTwo = true;
            }
        }
        if (hasThree) {
            threeLetter += 1;
        }
        if (hasTwo) {
            twoLetter += 1;
        }
    });
    console.log(twoLetter, threeLetter);
    return twoLetter * threeLetter;
}

export function part2() {
    const input = getInput();
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            let original = input[i].split("");
            let compared = input[j].split("");
            let difference = [];
            for (let c = 0; c < original.length; c++) {
                if (original[c] === compared[c]) {
                    difference.push(original[c]);
                }
            }
            if (difference.length === original.length - 1) {
                return difference.join("");
            }
        }
    }
    
}
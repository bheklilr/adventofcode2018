import { readFileSync } from "fs";

function getInput() {
    const input = readFileSync("./src/inputs/day01_1.txt", "utf8");
    return input.split("\n").filter(line => line.length > 0).map(line => {
        return Number(line);
    })
}

export function part1() {
    return getInput().reduce((prev, curr) => prev + curr, 0);
}

export function part2() {
    let input: number[] = [];
    let seenFreqs: number[] = [];
    let currentFreq = 0;
    while (seenFreqs.indexOf(currentFreq) < 0) {
        seenFreqs.push(currentFreq);
        if (input.length == 0) {
            input = getInput().reverse();
        }
        let line = input.pop()!;

        currentFreq += line;
    }
    return currentFreq;
}

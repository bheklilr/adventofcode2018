import { readFileSync, exists } from "fs";

interface Rectangle {
    left: number
    top: number
    width: number
    height: number
}

interface Claim extends Rectangle {
    id: number
}

function parseClaim(text: string): Claim | undefined {
    let match = text.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
    if (match) {
        let r = {
            id: Number(match[1]),
            left: Number(match[2]),
            top: Number(match[3]),
            width: Number(match[4]),
            height: Number(match[5]),
        }
        return r;
    }
}

function calculateOverlap(r1: Rectangle, r2: Rectangle): Rectangle | undefined {
    let left = Math.max(r1.left, r2.left);
    let right = Math.min(r1.left + r1.width, r2.left + r2.width);
    let top = Math.max(r1.top, r2.top);
    let bottom = Math.min(r1.top + r1.height, r2.top + r2.height);
    if (left >= right || top >= bottom) {
        return;
    }
    return {
        left,
        top,
        width: right - left,
        height: bottom - top,
    };
}

function containsPoint(r: Rectangle) {
    return (x: number, y: number) => {
        return (
            (r.left <= x && x < (r.left + r.width)) && 
            (r.top <= y && y < (r.top + r.height))
        )
    }
}

function anyContainsPoint(rs: Rectangle[]) {
    let contains = rs.map(containsPoint);
    return (x: number, y: number) => contains.some(c => c(x, y));
}

function calculateBounds(rs: Rectangle[]): Rectangle {
    let left = Number.MAX_SAFE_INTEGER;
    let right = 0;
    let top = Number.MAX_SAFE_INTEGER;
    let bottom = 0;

    for (let r of rs) {
        left = Math.min(left, r.left);
        right = Math.max(right, r.left + r.width);
        top = Math.min(top, r.top);
        bottom = Math.max(bottom, r.top + r.height);
    }

    return {
        left,
        top,
        width: right - left,
        height: bottom - top,
    }
}

function getInput(): Claim[] {
    const input = readFileSync("./src/inputs/day03.txt", "utf8");
    return input
        .split("\n")
        .filter(line => line.length > 0)
        .map(parseClaim)
        .filter(claim => claim !== undefined) as Claim[];
}

export function part1() {
    let claims = getInput();
    let overlaps = [];
    for (let i = 0; i < claims.length; i++) {
        for (let j = i + 1; j < claims.length; j++) {
            let overlap = calculateOverlap(claims[i], claims[j]);
            if (overlap !== undefined) {
                overlaps.push(overlap);
            }
        }
    }
    console.log(`Found ${overlaps.length} overlaps`);
    let boundingRectangle = calculateBounds(overlaps);
    console.log(`Bounding rectangle:`, boundingRectangle);
    let contains = anyContainsPoint(overlaps);
    let area = 0;
    for (let i = boundingRectangle.left; i < boundingRectangle.left + boundingRectangle.width; i++) {
        for (let j = boundingRectangle.top; j < boundingRectangle.top + boundingRectangle.height; j++) {
            area += contains(i, j) ? 1 : 0;
        }
    }
    return area;
}

export function part2() {
    let claims = getInput();
    let allIds = claims.map(c => c.id);
    for (let i = 0; i < claims.length; i++) {
        for (let j = i + 1; j < claims.length; j++) {
            let overlap = calculateOverlap(claims[i], claims[j]);
            if (overlap !== undefined) {
                let id1 = claims[i].id;
                let id2 = claims[j].id;
                allIds = allIds.filter(id => id !== id1).filter(id => id !== id2);
            }
        }
    }
    return allIds[0];
}
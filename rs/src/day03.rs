use regex::Regex;

use std::collections::HashSet;

const INPUT: &'static str = include_str!("../inputs/day03.txt");

struct Rect {
    pub left: i32,
    pub top: i32,
    pub width: i32,
    pub height: i32,
}

struct Claim {
    pub id: i32,
    pub r: Rect,
}

impl Rect {
    pub fn new(left: i32, top: i32, width: i32, height: i32) -> Rect {
        Rect {
            left: left,
            top: top,
            width: width,
            height: height,
        }
    }

    pub fn right(&self) -> i32 {
        self.left + self.width
    }

    pub fn bottom(&self) -> i32 {
        self.top + self.height
    }

    pub fn overlap(&self, other: &Rect) -> Option<Rect> {
        let left = std::cmp::max(self.left, other.left);
        let right = std::cmp::min(self.right(), other.right());
        let top = std::cmp::max(self.top, other.top);
        let bottom = std::cmp::min(self.bottom(), other.bottom());

        if left < right && top < bottom {
            Some(Rect::new(left, top, right - left, bottom - top))
        } else {
            None
        }
    }

    pub fn contains(&self, x: i32, y: i32) -> bool {
        (self.left <= x) && (x < self.right()) && (self.top <= y) && (y < self.bottom())
    }
}

fn any_contains(rects: &Vec<Rect>, x: i32, y: i32) -> bool {
    rects.iter().any(|ref r| r.contains(x, y))
}

impl Claim {
    pub fn new(id: i32, rect: Rect) -> Claim {
        Claim { id: id, r: rect }
    }

    pub fn parse(input: &str) -> Option<Claim> {
        let re = Regex::new("(\\d+)").unwrap();

        let matches: Vec<&str> = re.find_iter(input).map(|m| m.as_str()).collect();

        if matches.len() != 5 {
            return None;
        }

        let id = matches.get(0)?.parse().ok()?;
        let left = matches.get(1)?.parse().ok()?;
        let top = matches.get(2)?.parse().ok()?;
        let width = matches.get(3)?.parse().ok()?;
        let height = matches.get(4)?.parse().ok()?;

        Some(Claim::new(id, Rect::new(left, top, width, height)))
    }
}

fn get_input() -> Vec<Claim> {
    let input = INPUT.to_string();

    input
        .split("\n")
        .into_iter()
        .map(Claim::parse)
        .filter(|o| o.is_some())
        .map(|o| o.unwrap())
        .collect()
}


fn part1() -> i32 {
    let claims = get_input();
    let mut overlaps: Vec<Rect> = Vec::new();

    for i in 0..claims.len() {
        for j in (i + 1)..claims.len() {
            let overlap = claims[i].r.overlap(&claims[j].r);
            if overlap.is_some() {
                overlaps.push(overlap.unwrap())
            }
        }
    }

    let mut area = 0i32;

    for i in 0..1000 {
        for j in 0..1000 {
            area += if any_contains(&overlaps, i, j) { 1 } else { 0 }
        }
    }

    area
}

fn part2() -> i32 {
    let claims = get_input();
    let all_ids: HashSet<i32> = claims.iter().map(|c| c.id).collect();
    let mut overlapping_ids: HashSet<i32> = HashSet::new();
    for i in 0..claims.len() {
        for j in (i + 1)..claims.len() {
            let overlap = claims[i].r.overlap(&claims[j].r);
            if overlap.is_some() {
                overlapping_ids.insert(claims[i].id);
                overlapping_ids.insert(claims[j].id);
            }
        }
    }

    let missing = all_ids.difference(&overlapping_ids);
    *missing.last().unwrap_or(&0)
}

pub fn run() {
    println!("{}", part1());
    println!("{}", part2());
}

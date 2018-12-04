use std::collections::HashMap;

const INPUT: &'static str = include_str!("../inputs/day02.txt");

pub fn part1() -> i32 {
    let input = INPUT.to_string();
    let lines = input.split("\n");

    let mut twos = 0i32;
    let mut threes = 0i32;

    for line in lines {
        let mut chars: Vec<char> = line.chars().collect();
        let mut map: HashMap<char, i32> = HashMap::new();

        for c in chars {
            let new_value = map.get(&c).unwrap_or(&0i32) + 1;
            map.insert(c, new_value);
        }

        let mut has_two = false;
        let mut has_three = false;
        for entry in map.iter() {
            if *entry.1 == 2i32 {
                has_two = true;
            }
            if *entry.1 == 3i32 {
                has_three = true;
            }
        }

        if has_two {
            twos += 1;
        }
        if has_three {
            threes += 1;
        }
    }
    twos * threes
}

pub fn part2() -> String {
    let input = INPUT.to_string();
    let lines: Vec<&str> = input.split("\n").collect();

    for i in 0..lines.len() {
        for j in (i+1)..lines.len() {
            let l1: Vec<char> = lines[i].chars().collect();
            let l2: Vec<char> = lines[j].chars().collect();

            let mut common: Vec<char> = Vec::new();
            for k in 0..l1.len() {
                if l1[k] == l2[k] {
                    common.push(l1[k]);
                }
            }
            if common.len() == l1.len() - 1 {
                return common.iter().collect();
            }
        }
    }

    "".to_string()
}

pub fn run() {
    println!("{}", part1());
    println!("{}", part2());
}

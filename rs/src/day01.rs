use std::collections::HashSet;

const INPUT: &'static str = include_str!("../inputs/day01.txt");

pub fn part1() -> i32 {
    let input = INPUT.to_string();
    let lines = input.split("\n");

    let mut freq = 0i32;
    for line in lines {
        let f = line.parse::<i32>().unwrap_or(0);
        freq += f;
    }
    freq
}

pub fn part2() -> i32 {
    let input = INPUT.to_string();
    let mut lines = input.split("\n");
    let mut seen_freqs = HashSet::<i32>::new();
    let mut current_freq = 0i32;
    loop {
        let mut line = lines.next();
        if !line.is_some() {
            lines = input.split("\n");
            line = lines.next();
        }

        let f = line.unwrap().parse::<i32>();
        if f.is_ok() {
            current_freq += f.unwrap();
            if seen_freqs.contains(&current_freq) {
                return current_freq;
            } else {
                seen_freqs.insert(current_freq);
            }
        }
    }
}

pub fn run() {
    println!("{}", part1());
    println!("{}", part2());
}

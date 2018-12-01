import Vorpal from 'vorpal'

type DayModule = {
    part1: () => void;
    part2: () => void;
}

let cli = new Vorpal();
cli.command("day [day]").action(async (args: Vorpal.Args) => {
    if (args['day']) {
        let day = "0" + args.day;
        if (day.length == 3) {
            day = day.substr(1);
        }
        let dayModule: DayModule = await import("./day" + day).catch((reason: any) => {
            console.log("Enter a day between 1 and 25");
        })
        console.log(`Day ${day}, Part 1`);
        console.log("=====================================================");
        console.log(dayModule.part1());
        console.log("\n\n");
        console.log(`Day ${day}, Part 2`);
        console.log("=====================================================");
        console.log(dayModule.part2());
        console.log();
    }
});
cli.delimiter("").show().parse(process.argv);

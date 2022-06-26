function solution(operations) {
    const q = [];
    const extremums = [0, 0];

    operations.forEach((operation) => {
        let [cmd, v] = operation.split(" ");
        v = parseInt(v);
        if (cmd === "I") {
            q.push(v);
            if (v > extremums[0]) extremums[0] = v;
            if (v < extremums[1]) extremums[1] = v;
        } else if (cmd === "D" && q.length !== 0) {
            const how = v === 1 ? 0 : 1;
            const idx = q.findIndex((value) => value === extremums[how]);

            q.splice(idx, 1);

            if (q.length > 0) {
                extremums[how] = how === 0 ? Math.max(...q) : Math.min(...q);
            } else {
                extremums[0] = 0;
                extremums[1] = 0;
            }
            console.log({ how, q, idx, extremums });
        }
    });
    console.log(extremums);
    return extremums;
}
solution(["I 16", "D 1"]);
solution(["I 7", "I 5", "I -5", "D -1"]);
solution([
    "I -45",
    "I 653",
    "D 1",
    "I -642",
    "I 45",
    "I 97",
    "D 1",
    "D -1",
    "I 333",
]);
solution([
    "I 4",
    "I 3",
    "I 2",
    "I 1",
    "D 1",
    "D 1",
    "D -1",
    "D -1",
    "I 5",
    "I 6",
]);

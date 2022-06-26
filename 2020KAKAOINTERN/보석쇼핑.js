function solution(gems) {
    const map = new Map();
    const set = new Set([...gems]);
    const len = set.size;
    // best : [start,end];
    const best = [0, gems.length];
    gems.forEach((gem, i) => {
        map.delete(gem);
        map.set(gem, i);
        if (map.size === len) {
            const temp = [...map];
            if (best[1] - best[0] > i - temp[0][1]) {
                best[1] = i;
                best[0] = temp[0][1];
            }
        }
    });
    return best.map((v) => v + 1);
}
let gems = [
    ['DIA', 'RUBY', 'RUBY', 'DIA', 'DIA', 'EMERALD', 'SAPPHIRE', 'DIA'],
    ['AA', 'AB', 'AC', 'AA', 'AC'],
    ['XYZ', 'XYZ', 'XYZ'],
    ['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB'],
];
gems.forEach((gem) => console.log(solution(gem)));

/* 
 정답코드

*/
function solution(gems) {
    const len = new Set([...gems]).size;
    const map = new Map();
    let best = [0, gems.length];
    gems.forEach((gem, i) => {
        map.delete(gem);
        map.set(gem, i);
        if (map.size === len) {
            const iter = map[Symbol.iterator]();
            const cand = [iter.next().value[1], i];
            best = best[1] - best[0] > cand[1] - cand[0] ? cand : best;
        }
    });
    return best.map((v) => (v += 1));
}

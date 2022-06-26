/* 이전 정답 코드
function solution(s) {
    return s
        .slice(1, -1)
        .split(/,(?={)/g)
        .map((str) => str.slice(1, -1).split(','))
        .sort((a, b) => a.length - b.length)
        .reduce((acc, cur) => {
            while (cur.length > 0) {
                const num = cur.shift();
                if (acc.findIndex((arr) => arr.toString() === num) === -1)
                    acc.push(parseInt(num));
            }
            return acc;
        }, []);
}
*/
function solution(s) {
    const set = s
        .slice(1, -1)
        .split(/,(?={)/g)
        .map((v) => v.slice(1, -1).split(','))
        .sort((a, b) => a.length - b.length)
        .reduce((set, c) => {
            for (let i = 0; i < c.length; i++) {
                if (!set.has(c[i])) set.add(parseInt(c[i]));
            }
            return set;
        }, new Set());
    return [...set];
}

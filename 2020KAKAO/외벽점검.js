function solution(n, weak, dist) {
    const weak_len = weak.length;
    const weak_d = makeWeakDist(weak, weak_len, n);
    const cand = Array.from({ length: weak_len * 2 }, (_, i) => i % weak_len);
    const dist_len = dist.length;
    dist.sort((a, b) => b - a);
    let ret = Infinity;

    // 일단 시계방향으로 가는걸 생각해보자
    let left = 0;
    let right = weak_len + 1;
    while (left < weak_len && right <= cand.length) {
        let weak_mod = cand.slice(left, right);
        left += 1;
        right += 1;
    }
}
function makeWeakDist(weak, weak_len, n) {
    const weak_d = Array.from({ length: 2 }, () =>
        Array.from({ length: weak_len }, () =>
            Array.from({ length: weak_len }, () => -1),
        ),
    );

    for (let i = 0; i < weak_len; i++) {
        weak_d[0][i][i] = 0;
        for (let j = 0; j < weak_len; j++) {
            if (weak_d[0][i][j] === -1) {
                weak_d[0][i][j] = weak[j] - weak[i];
                if (weak_d[0][i][j] < 0) weak_d[0][i][j] += n;
            }
        }
    }
    weak_d[1] = weak_d[0].map((row, i) =>
        row.map((col, j) => (i !== j ? n - col : 0)),
    );
    return weak_d;
}
function check(permu, friends, weak_d) {
    let cnt = 0;
    let freind = 0;
    for (let index = 0; index < permu.length - 1; index++) {}
}

solution(12, [1, 5, 6, 10], [1, 2, 3, 4]);

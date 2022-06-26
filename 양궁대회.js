function solution(n, info) {
    let bestDiff = 0;
    let ret = Array.from({ length: 11 }, () => 0);
    let isChange = false;
    const compare = (a, b) => {
        for (let i = 10; i >= 0; i--) {
            if (a[i] !== b[i]) {
                return a[i] > b[i] ? a : b;
            }
        }
    };
    function shoot(i, shootCnt, ryan, appeachScore, ryanScore) {
        if (i === -1) {
            // 기저사례 : 더 이상 할 것이 없을 때 인데... ryan이 아직 끝나지도 않았는데 계산을 하게 되네...
            const diff = ryanScore - appeachScore;
            if (bestDiff < diff && shootCnt === 0) {
                //console.log({ ryan, ryanScore, appeachScore, diff, shootCnt });
                bestDiff = diff;
                isChange = true;
                ret = ryan;
            } else if (bestDiff === diff && shootCnt === 0) {
                //더 낮은 점수를 많이 맞추는 점수가 이겨야함...
                ret = compare(ret, ryan);
            }
            return undefined;
        }
        if (info[i] + 1 <= shootCnt) {
            // 현재 점수에서 먹거나.. 먹으면 라이언이 k점을 획득하고 어피치는 못얻음
            // k 점은 ... 10-i
            const temp = [...ryan];
            temp[i] = info[i] + 1;
            shoot(
                i - 1,
                shootCnt - (info[i] + 1),
                temp,
                appeachScore,
                ryanScore + (10 - i),
            );
        }
        //현재 점수를 안먹고 그냥 지나쳐 가거나
        const score = info[i] !== 0 ? 10 - i : 0;
        shoot(i - 1, shootCnt, ryan, appeachScore + score, ryanScore);
        // 현재 점수를 안먹는데 쏘거나
        for (let shooting = 1; shooting <= info[i]; shooting++) {
            const temp = [...ryan];
            temp[i] = shooting;
            shoot(
                i - 1,
                shootCnt - shooting,
                temp,
                appeachScore + score,
                ryanScore,
            );
        }
    }
    shoot(
        10,
        n,
        Array.from({ length: 11 }, () => 0),
        0,
        0,
    );
    return isChange ? ret : [-1];
}

solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
//solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]);
//solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]);
//solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]);

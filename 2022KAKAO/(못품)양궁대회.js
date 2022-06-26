// 아 이문제 좀 어렵네..

/* function solution(n, info) {
    // 라이언이 우승을 해야 한다.
    let best = [-Infinity, Array.from({ length: 11 }, () => 0)];
    shoot(
        0,
        n,
        info,
        Array.from({ length: 11 }, () => 0),
        Array.from({ length: 11 }, () => 0),
        best,
    );
    if (best[0] === -1) return [-1];
    return best[1];
}
// 조각을 나눈다면 각 과녁에서 라이언이 어피치를 이길 것인가 말것인가
// 그래서 알고 싶은게 뭔데 -> 가장 큰 점수차를 원한다 이말이지
// 완전 탐색으로 접근하는 건 맞는 것 같은데
// 라이언과 어피치의 점수를 각자 유지를 하면서 나가야 될 듯 그래서 가장 큰 차이를 찾아야 할 것 같어
// 그럼 각 과녁을 라이언이 맞췄을 때 어피치의 점수보다 앞서 나가야 하잖아
// shoot(score,n) = Math.max(shoot(score+1,n-info[score]), shoot(score+1,n))
// 근데 결국에 라이언과 어피치의 차이가 중요하기 때문에..
// 라이언이 이긴다면 어피치는 득점을 못하고
// 라이언이 진다면 어피치는 득점을 한다. 단 어피치가 해당 과녁을 맞췄을 경우
function getScore(ryan, apeach) {
    let ryan_score = 0;
    let apeach_score = 0;
    for (let i = 0; i < 12; i++) {
        if (ryan[i] > 0 && ryan[i] > apeach[i]) {
            ryan_score += 10 - i;
        } else if (apeach[i] > 0) {
            apeach_score += 10 - i;
        }
    }
    return ryan_score - apeach_score;
}
function logGetScore(ryan, apeach) {
    let ryan_score = 0;
    let apeach_score = 0;
    for (let i = 0; i < 12; i++) {
        if (ryan[i] > 0 && ryan[i] > apeach[i]) {
            ryan_score += 10 - i;
        } else if (apeach[i] > 0) {
            apeach_score += 10 - i;
        }
    }
    console.log(ryan_score, apeach_score);
}
function shoot(score, n, info, ryan, apeach, best) {
    // 그렇다면 어피치의 현재 점수와 라이언의 현재 점수를 알고 있을 때
    // 현재 과녁에서 라이언이 어피치보다 더 높은 점수차를 얻을 수 있는 경우를 완전 탐색??
    // 기저사례 : 11번의 과녁을 모두 확인했을 경우
    if (score === 11) {
        const returnValue = getScore(ryan, apeach);
        if (best[0] < returnValue) {
            best[0] = returnValue;
            best[1] = [...ryan];
        }
        return returnValue;
    }
    let ret = 0;
    //현재 과녁에서 라이언이 득점할 경우
    if (info[score] + 1 <= n) {
        ryan[score] = info[score] + 1;
        apeach[score] = info[score];
        ret = Math.max(
            ret,
            shoot(
                score + 1,
                n - (info[score] + 1),
                info,
                [...ryan],
                [...apeach],
                best,
            ),
        );
    }
    if (info[score] !== 0) {
        ryan[score] = 0;
        apeach[score] = info[score];
        ret = Math.max(
            ret,
            shoot(score + 1, n, info, [...ryan], [...apeach], best),
        );
    }
    ryan[score] = 0;
    apeach[score] = info[score];
    ret = Math.max(
        ret,
        shoot(score + 1, n, info, [...ryan], [...apeach], best),
    );

    for (let shooting = 0; shooting <= info[score]; shooting++) {
        ryan[score] = shooting;
        ret = Math.max(
            ret,
            shoot(score + 1, n - shooting, info, [...ryan], [...apeach], best),
        );
    }
    return ret;
} */
function solution(n, info) {
    let best = [0, [-1]];
    shoot(
        0,
        n,
        info,
        Array.from({ length: 11 }, () => 0),
        best,
    );
    return best[0] === 0 ? [-1] : best[1];
}
function compare(prev, next) {
    for (let i = 10; i >= 0; i--) {
        if (prev[i] === next[i]) continue;
        if (prev[i] > next[i]) return true;
        else return false;
    }
    return true;
}
function calcDiff(ryan, info) {
    let ryan_score = 0;
    let apeach_score = 0;
    for (let i = 0; i < 11; i++) {
        if (ryan[i] === 0 && info[i] === 0) continue;
        if (ryan[i] > info[i]) ryan_score += 10 - i;
        else apeach_score += 10 - i;
    }
    return ryan_score - apeach_score;
}
function shoot(score, n, info, ryan, best) {
    if (score === 11) {
        let diff = calcDiff(ryan, info);
        if (best[0] < diff && n === 0) {
            best[0] = diff;
            best[1] = ryan;
        } else if (best[0] === diff && n === 0) {
            best[1] = compare(best[1], ryan) ? best[1] : ryan;
        }
        return;
    }

    for (let i = 0; i <= n; i++) {
        let next_ryan = [...ryan];
        next_ryan[score] = i;
        shoot(score + 1, n - i, info, next_ryan, best);
    }
}
console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
// console.log(solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
// console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]));
// console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));

/* 
    정답코드
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
            const diff = ryanScore - appeachScore;
            if (bestDiff < diff && shootCnt === 0) {
                isChange = true;
                bestDiff = diff;
                ret = ryan;
            } else if (bestDiff === diff && shootCnt === 0) {
                
                ret = compare(ret, ryan);
            }
            return undefined;
        }
        if (info[i] + 1 <= shootCnt) {
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
        
        const score = info[i] !== 0 ? 10 - i : 0;
        shoot(i - 1, shootCnt, ryan, appeachScore + score, ryanScore);
        
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
*/

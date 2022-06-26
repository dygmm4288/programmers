/* 
    실패율
    -> "부분합"을 이용한 문제풀이...
*/

// 동적으로 게임 시간을 늘려서 난이도를 조절한다.
// 실패율 -> 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수

// 전체 스테이지 수 N, 게임을 이용하는 사용자가 현재 멈춰있는 스테이지의 번호가 담긴 배열 stages
function solution(N, stages) {
    const partialSum = Array.from({ length: N + 2 }, () => 0);
    const noClear = Array.from({ length: N + 1 }, () => 0);
    // if) n === 5 , stage ===6 partialSum[7]
    stages.forEach((stage) => {
        partialSum[1] += 1;
        partialSum[stage + 1] -= 1;
        noClear[stage] += 1;
    });

    for (let i = 1; i <= N; i++) {
        partialSum[i] += partialSum[i - 1];
    }

    const failure = Array.from({ length: N + 1 });

    for (let i = 1; i <= N; i++) {
        failure[i] = { stage: i, failRate: noClear[i] / partialSum[i] };
    }

    return failure
        .slice(1)
        .sort((a, b) => b.fail - a.fail)
        .map((item) => item.stage);
}
// 정답 풀이
const solution = (N, stages) => {
    return [...Array(N).keys()]
        .map((v) => getFail(v, stages))
        .sort((a, b) => b.fail - a.fail || a.stage - b.stage)
        .map((v) => v.stage);
};
const getFail = (stage, stages) => {
    const fail = stages.reduce(
        (acc, cur) => (
            cur > stage + 1
                ? acc.clear++
                : cur >= stage + 1
                ? acc.nClear++
                : null,
            acc
        ),
        { clear: 0, nClear: 0 },
    );
    return { stage: stage + 1, fail: fail.nClear / (fail.clear + fail.nClear) };
};

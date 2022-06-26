/* // 초당 최대 처리량 -> 요청의 응답 완료 여부에 관계없이
// 임의 시간부터 1초(1000밀리초)간 처리하는 요청의 최대 개수
// lines -> line -> 응답완료시간(S) 처리시간(T)
// S -> 2016-09-15 hh:mm:ss.sss
// T -> 최대 소수점 셋째 자리까지 기록
function solution(lines) {
    const calcTime = (h, m, s) => h * 3600 + m * 60 + s;
    const n = lines.length;

    let best = 0;

    lines = lines.map((line) => line.split(' '));

    const startTime = lines.map(
        (line) =>
            calcTime(...line[1].split(':')) -
            calcTime(0, 0, line[2].slice(0, -1)) +
            1,
    );

    lines.forEach((line, i) => {
        const end = calcTime(...line[1].split(':'));
        let cnt = 0;
        for (let j = i; j < n; j++) {
            if (end > startTime[j] - 1000) cnt++;
        }
        best = Math.max(best, cnt);
    });

    return best;
}

/* 
function solution(lines) {
    const calcTime = (h, m, s) => (h * 3600 + m * 60 + s * 1) * 1000;
    lines = lines.map((line) => line.split(" "));
    const len = lines.length;
    const start = lines.map(
        (line) =>
            calcTime(...line[1].split(":")) -
            calcTime(0, 0, line[2].slice(0, -1)) +
            1
    );
    let max = 0;
    lines.forEach((line, i) => {
        const end = calcTime(...line[1].split(":"));
        let cnt = 0;
        for (let j = i; j < len; j++) {
            if (end > start[j] - 1000) cnt++;
        }
        max = Math.max(cnt, max);
    });
    return max;
}
 */

function solution(lines) {
    // "2016-09-15 01:00:04.001 2.0s",
    const calcTime = (h, m, s) => (h * 3600 + m * 60 + s * 1) * 1000;
    lines = lines.map((line) => line.split(' '));
    const startTime = lines.map(
        (line) =>
            calcTime(...line[1].split(':')) -
            calcTime(line[2].slice(0, -1)) +
            1,
    );

    let best = 0;
    const len = lines.length;

    lines.forEach((line, i) => {
        const endTime = calcTime(...line[1].split(':'));
        let cnt = 0;
        for (let j = i; j < len; j++) {
            if (endTime > startTime[j] - 1000) cnt++;
        }
        best = Math.max(best, cnt);
    });

    return best;
}

/* function solution(play_time, adv_time, logs) {
    const strToTime = (str) => {
        const [h, m, s] = str.split(':');
        return h * 3600 + m * 60 + s * 1;
    };
    const getTime = (str) => str.split('-').map(strToTime);
    const pasteZero = (time) => (time < 10 ? '0' + time : time);
    const timeToStr = (time) => {
        const h = parseInt(time / 3600);
        time -= h * 3600;
        const m = parseInt(time / 60);
        time -= m * 60;
        const s = time;

        return `${pasteZero(h)}:${pasteZero(m)}:${pasteZero(s)}`;
    };
    const len = strToTime(play_time) + 1;
    const section = strToTime(adv_time) + 1;
    const timeline = Array.from({ length: len }, () => 0);

    logs.forEach((log) => {
        const [start, end] = getTime(log);
        timeline[start] += 1;
        if (end + 1 < len) timeline[end] -= 1;
    });
    let sum = timeline[0];
    let left = 0;

    for (let i = 1; i < section; i++) {
        timeline[i] += timeline[i - 1];
        sum += timeline[i];
    }

    let best = { sum: 0, idx: left };

    for (let i = section; i < len; i++) {
        timeline[i] += timeline[i - 1];
        sum += timeline[i];
        sum -= timeline[left++];

        if (sum > best.sum) {
            best = {
                sum,
                idx: left,
            };
        }
    }

    return timeToStr(best.idx);
} */

/* 
function solution(play_time, adv_time, logs) {
    const strToTime = (str) => {
        const [h, m, s] = str.split(':');
        return h * 3600 + m * 60 + s * 1;
    };
    const timeToStr = (time) => {
        let h = parseInt(time / 3600);
        time -= h * 3600;
        let m = parseInt(time / 60);
        time -= m * 60;
        let s = parseInt(time);
        const pasteZero = (time) => (time < 10 ? '0' + time : time);
        return `${pasteZero(h)}:${pasteZero(m)}:${pasteZero(s)}`;
    };
    const getTime = (str) => str.split('-').map(strToTime);

    const len = strToTime(play_time);
    const timeline = Array.from({ length: len + 1 }, () => 0);

    logs.forEach((log) => {
        const [start, end] = getTime(log);
        timeline[start] += 1;
        timeline[end + 1] -= 1;
    });

    let sum = timeline[0];
    let section = strToTime(adv_time);
    let left = 0;

    for (let i = 1; i <= section; i++) {
        timeline[i] += timeline[i - 1];
        sum += timeline[i];
    }

    let best = { sum, idx: 0 };
    for (let i = section+1; i <= len; i++) {
        timeline[i] += timeline[i - 1];
        sum += timeline[i];
        sum -= timeline[left++];
        if (sum > best.sum) {
            best = {
                sum,
                idx: i - section,
            };
        }
    }
    return timeToStr(best.idx);
}

*/

function solution(play_time, adv_time, logs) {
    const strToTime = (str) => {
        const [h, m, s] = str.split(':');
        return h * 3600 + m * 60 + s * 1;
    };
    const timeToStr = (time) => {
        let s = time % 60;
        time = parseInt(time / 60);
        let m = time % 60;
        time = parseInt(time / 60);
        let h = parseInt(time);

        const pasteZero = (n) => (n < 10 ? '0' + n : n);
        return `${pasteZero(h)}:${pasteZero(m)}:${pasteZero(s)}`;
    };
    const MAXLEN = 360000;
    const timeline = Array.from({ length: MAXLEN }, () => 0);
    logs.forEach((log) => {
        const [start, end] = log.split('-').map(strToTime);
        timeline[start] += 1;
        timeline[end] -= 1;
    });

    const n = strToTime(play_time);
    const len = strToTime(adv_time);

    let left = 0;
    let sum = timeline[0];
    let maxSum;

    for (let i = 1; i < len; i++) {
        timeline[i] += timeline[i - 1];
        sum += timeline[i];
    }
    maxSum = sum;
    let idx = 0;
    for (let i = len; i < n; i++) {
        timeline[i] += timeline[i - 1];
        sum += timeline[i];
        sum -= timeline[left++];
        if (sum > maxSum) {
            idx = left;
            maxSum = sum;
        }
    }
    console.log(timeToStr(idx));
    return timeToStr(idx);
}
solution('02:03:55', '00:14:15', [
    '01:20:15-01:45:14',
    '00:40:31-01:00:00',
    '00:25:50-00:48:29',
    '01:30:59-01:53:29',
    '01:37:44-02:02:30',
]);
solution('99:59:59', '25:00:00', [
    '69:59:59-89:59:59',
    '01:00:00-21:00:00',
    '79:59:59-99:59:59',
    '11:00:00-31:00:00',
]);
solution('50:00:00', '50:00:00', [
    ('15:36:51-38:21:49', '10:14:18-15:36:51', '38:21:49-42:51:45'),
]);

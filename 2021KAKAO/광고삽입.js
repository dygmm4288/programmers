function solution(play_time, adv_time, logs) {
    const covertTime = (str) => {
        const [hh, mm, ss] = str.split(':');
        return hh * 3600 + mm * 60 + ss * 1;
    };
    const convertString = (time) => {
        let h = Math.floor(time / 3600);
        time -= h * 3600;
        let m = Math.floor(time / 60);
        time -= m * 60;
        let s = time;
        const pasteZero = (n) => (n < 10 ? '0' + n : n);
        return `${pasteZero(h)}:${pasteZero(m)}:${pasteZero(s)}`;
    };

    const MAX_TIMELINE = covertTime(play_time) + 1;
    const timeline = Array.from({ length: MAX_TIMELINE }, () => 0);

    logs.forEach((log) => {
        const [startTime, endTime] = log.split('-').map(covertTime);
        timeline[startTime] += 1;
        timeline[endTime] -= 1;
    });

    const section = covertTime(adv_time);

    let sum = timeline[0];

    for (let i = 1; i < section; i++) {
        timeline[i] += timeline[i - 1];
        sum += timeline[i];
    }

    let left = 0;
    let best = {
        sum: sum,
        index: 0,
    };

    for (let i = section; i < MAX_TIMELINE; i++) {
        timeline[i] += timeline[i - 1];
        sum += timeline[i];
        sum -= timeline[left++];
        if (sum > best.sum) {
            best = {
                sum: sum,
                index: left,
            };
        }
    }

    return convertString(best.index);
}
console.log(
    solution('02:03:55', '00:14:15', [
        '01:20:15-01:45:14',
        '00:40:31-01:00:00',
        '00:25:50-00:48:29',
        '01:30:59-01:53:29',
        '01:37:44-02:02:30',
    ]),
);

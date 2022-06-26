/* function solution(s) {
    let ret = Infinity;
    const len = s.length;
    for (let unit = 1; unit <= len / 2; unit++) {
        const arr = [];
        for (let i = 0; i < len; i += unit) {
            arr.push(s.slice(i, i + unit));
        }
        let left = 0,
            right = 1,
            cnt = 0;
        while (left < arr.length && right < arr.length) {
            if (arr[left] !== arr[right]) {
                cnt += 1 + arr[left];
                left = right;
                right = right + 1;
            }
            right++;
        }
        ret = Math.min(ret, cnt);
    }
    return ret;
}
 */
function solution(s) {
    let ret = Infinity;
    if (s.length === 1) return 1;
    for (let unit = 1, len = s.length; unit <= Math.floor(len / 2); unit++) {
        const sliced = [];
        for (let i = 0; i < len; i += unit) {
            sliced.push(s.slice(i, i + unit));
        }

        let left = 0,
            right = 1,
            matched = 1,
            length = 0;

        while (right < sliced.length || left < sliced.length) {
            if (sliced[left] !== sliced[right]) {
                length +=
                    (matched === 1 ? 0 : matched.toString().length) +
                    sliced[left].length;
                matched = 1;
                left = right;
                right = left + 1;
                continue;
            }
            matched += 1;
            right += 1;
        }
        console.log({ unit, length });
        ret = Math.min(ret, length);
    }
    return ret;
}

solution('abcabcdede');
solution('ababcdcdababcdcd');

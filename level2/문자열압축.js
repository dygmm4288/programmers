function solution(s) {
    const len = s.length;
    let ret = len;
    for (let unit = 1; unit <= Math.floor(len / 2); unit++) {
        const sliced = [];
        for (let i = 0; i < len; i += unit) {
            sliced.push(s.slice(i, i + unit));
        }
        let left = 0;
        let right = 1;
        let matchCnt = 1;
        let cand = '';
        while (left < sliced.length || right < sliced.length) {
            if (sliced[left] === sliced[right]) {
                // 같은 문자열일 경우
                matchCnt++;
                right += 1;
            } else if (sliced[left] !== sliced[right]) {
                // 같은 문자열이 아닐 경우
                // 앞에 숫자 + unit의 길이
                cand += matchCnt === 1 ? sliced[left] : matchCnt + sliced[left];
                matchCnt = 1;
                left = right;
                right = left + 1;
            }
        }
        ret = Math.min(cand.length, ret);
    }
    return ret;
}

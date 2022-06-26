/* 
    문자열 압축
    
    문자열을 1개 이상 단위로 잘라서 압축하여 더 짧은 문자열로 표현할 수 있는 방법
    
*/
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
        ret = Math.min(cand, ret);
    }
    return ret;
}

/* 
정답코드
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
        ret = Math.min(ret, length);
    }
    return ret;
}

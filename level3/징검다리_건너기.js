function counting(stones, mid, k) {
    const n = stones.length;
    for (let i = 0; i < n; i++) {
        if (stones[i] - mid < 1) {
            let cnt = 0;
            while (stones[i] - mid < 1) {
                cnt++;
                i++;
            }
            if (cnt >= k) return true;
        }
    }
    return false;
}
function solution(stones, k) {
    // 이분법으로 찾으면 될 것 같고
    // 중요한건 징검다리의 돌들이 얼만큼 띄워져 있느냐 이게 관건인듯
    let lo = 0,
        hi = 200000;

    while (lo < hi) {
        const mid = parseInt((lo + hi) / 2);
        if (counting(stones, mid, k)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3));
/* 
    이전 성공한 코드
    function consecutive(stones, mid) {
    const nextStone = stones.map((stone) => stone - mid);
    let count = 0,
        ret = 0;

    for (let i = 0, len = nextStone.length; i < len; i++) {
        if (nextStone[i] <= 0) {
            while (nextStone[i] <= 0) {
                count++;
                i++;
                ret = Math.max(ret, count);
            }
            i--;
            count = 0;
        }
    }
    return ret;
}
function solution(stones, k) {
    
    let lo = 0,
    hi = 200000000;
    while (lo < hi) {
        const mid = parseInt((lo + hi) / 2);
        if (consecutive(stones, mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
*/

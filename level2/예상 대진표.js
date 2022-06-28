function solution(n, a, b) {
    if (a > b) {
        [a, b] = [b, a];
    }
    let ret = 0;
    while (a !== b) {
        a = Math.ceil(a / 2);
        b = Math.ceil(b / 2);
        ret++;
    }
    return ret;
}
/* 이전 코드
function solution(n, a, b) {
    let ret = 1;
    const getNextNumber = (n) =>
        n % 2 === 0 ? parseInt(n / 2) : parseInt(n / 2) + 1;
    if (a > b) {
        const temp = a;
        a = b;
        b = temp;
    }
    while (n !== 2) {
        for (let i = 1; i <= n; i += 2) {
            if (i === a && i + 1 === b) {
                return ret;
            }
        }
        a = getNextNumber(a);
        b = getNextNumber(b);
        ret += 1;
        n /= 2;
    }
    return ret;
}*/

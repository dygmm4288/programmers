function solution(n, k) {
    const splited = n.toString(k).split('0');

    return splited.reduce((a, c) => {
        if (isPrime(parseInt(c))) a += 1;
        return a;
    }, 0);
}
function isPrime(n) {
    if (n === 2) return true;
    if (n <= 1 || n % 2 === 0 || isNaN(n)) return false;
    const sqrtn = Math.floor(Math.sqrt(n));
    for (let div = 3; div <= sqrtn; div++) {
        if (n % div === 0) return false;
    }
    return true;
}
console.log(solution(437674, 3));

/* 
    정답코드

    function solution(n, k) {
    const split = n.toString(k).split("0");

    let cnt = 0;

    for (let i = 0, len = split.length; i < len; i++) {
        if (isPrime(parseInt(split[i]))) cnt++;
    }
    return cnt;
}
function isPrime(n) {
    if (n <= 1) return false;
    if (n === 2) return true;
    if(isNaN(n)) return false;
    if (n % 2 === 0)     return false;

    let sqrtn = parseInt(Math.sqrt(n));

    for (let div = 3; div <= sqrtn; div++) {
        if (n % div === 0) return false;
    }
    return true;
}
 */

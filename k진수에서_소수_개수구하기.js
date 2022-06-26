function solution(n, k) {
    const split = n.toString(k).split("0");
    console.log(n.toString(k), split);
    let cnt = 0;
    console.log(parseInt(""));
    for (let i = 0, len = split.length; i < len; i++) {
        if (isPrime(parseInt(split[i]))) cnt++;
    }
    console.log({ cnt });
    return cnt;
}
function isPrime(n) {
    if (isNaN(n)) return false;
    if (n <= 1) return false;
    if (n === 2) return true;

    if (n % 2 === 0) return false;

    let sqrtn = parseInt(Math.sqrt(n));

    for (let div = 3; div <= sqrtn; div++) {
        if (n % div === 0) return false;
    }
    return true;
}
solution(437674, 3);
solution(110011, 10);

function solution(numbers) {
    const permutation = new Set();
    let MAX = -1;
    function generatePermutation(arr, pick, picked) {
        if (pick === 0) {
            const number = parseInt(picked.join(''));
            MAX = Math.max(number, MAX);
            permutation.add(number);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            picked.push(arr[i]);
            const temp = [...arr];
            temp.splice(i, 1);
            generatePermutation(temp, pick - 1, [...picked]);
            picked.pop();
        }
    }
    numbers = numbers.split('');
    for (let i = 1; i <= numbers.length; i++) {
        generatePermutation(numbers, i, []);
    }
    const isPrime = Array.from({ length: MAX + 1 }, () => true);
    isPrime[0] = isPrime[1] = false;

    let sqrtn = parseInt(Math.sqrt(MAX));

    for (let i = 2; i <= sqrtn; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= MAX; j += i) {
                isPrime[j] = false;
            }
        }
    }
    let cnt = 0;
    permutation.forEach((value) => {
        if (isPrime[value]) cnt++;
    });
    return cnt;
}

/* 이전코드
const solution = (numbers) =>
    subset(numbers.split(''))
        .slice(1)
        .map((v) => parseInt(v.join('')))
        .reduce(deleteOverlap, [])
        .reduce((acc, cur) => (isPrime(cur) ? acc++ : acc, acc), 0);
const deleteOverlap = (acc, cur) =>
    acc.includes(cur) ? acc : (acc.push(cur), acc);
const isPrime = (num) => {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
};
const subset = (arr) =>
    arr.reduce(
        (list, ele) => (
            list.map((seq) => {
                for (let i = seq.length; i >= 0; i--) {
                    const newSeq = [...seq];
                    newSeq.splice(i, 0, ele);
                    list.push(newSeq);
                }
            }),
            list
        ),
        [[]],
    );
*/

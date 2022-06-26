function solution(numbers, target) {
    return dfs(numbers, target);
}
function dfs(numbers, target, curNum = 0, idx = -1) {
    const nextNum = numbers[idx + 1];

    if (!nextNum) {
        return curNum === target ? 1 : 0;
    }
    const plusNum = curNum + nextNum;
    const minusNum = curNum - nextNum;

    return (
        dfs(numbers, target, plusNum, idx + 1) +
        dfs(numbers, target, minusNum, idx + 1)
    );
}

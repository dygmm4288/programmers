function solution(s) {
    const answer = reduce(
        s,
        (acc, cur) => {
            acc.push(cur);
            const len = acc.length;
            if (acc[len - 1] === acc[len - 2]) {
                acc.pop();
                acc.pop();
            }
            return acc;
        },
        [],
    );
    return answer.length === 0 ? 1 : 0;
}
function reduce(str, iter, initial) {
    for (let i = 0, len = str.length; i < len; i++) {
        initial = iter(initial, str[i]);
    }
    return initial;
}

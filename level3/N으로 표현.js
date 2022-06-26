/* function solution(N, number) {
    if (N === number) return 1;
    const sets = Array.from({ length: 9 }, () => new Set());
    const isEqual = (result, n) =>
        result.filter((value) => parseInt(value) === parseInt(n)).length !== 0;

    sets[1].add(N);
    for (let count = 2; count < 9; count++) {
        // 그냥 이어붙인게 number랑 같다면
        const repeat = parseInt(N.toString().repeat(count));
        if (repeat === number) {
            return count;
        }
        sets[count].add(repeat);
        for (let i = 1; i < count; i++) {
            for (const op1 of sets[count - i]) {
                for (const op2 of sets[i]) {
                    const cand = [
                        op1 + op2,
                        op1 - op2,
                        op1 * op2,
                        op2 === 0 ? 0 : parseInt(op1 / op2),
                    ];
                    if (isEqual(cand, number)) return count;
                    cand.forEach((value) => sets[count].add(value));
                }
            }
        }
    }
    return -1;
}
console.log(solution(5, 12));
/* 
    통과한 코드
    function solution(N, number) {
    if(N === number) return 1;
    const cache = Array.from({ length: 9 }, () => new Set());
    
    cache[1].add(N);
    const repeat = (N, how) => parseInt(N.toString().repeat(how));
    const isEqual = (arr, number) =>
        arr.filter((v) => v === number).length !== 0;
    for (let count = 2; count < 9; count++) {
        let paste = repeat(N, count);
        if (paste === number) return count;
        cache[count].add(paste);
        for (let i = 1, len = count; i < len; i++) {
            for (const op1 of cache[count - i]) {
                for (const op2 of cache[i]) {
                    const plus = op1 + op2;
                    const minus = op1 - op2;
                    const multiple = op1 * op2;
                    const divide = parseInt(isNaN(op1 / op2) ? 0 : op1 / op2);

                    if (isEqual([plus, minus, multiple, divide], number))
                        return count;

                    cache[count].add(plus).add(minus).add(multiple).add(divide);
                }
            }
        }
    }

    return -1;
}
 */

function solution(N, number) {
    if (N === number) return 1;
    const cache = Array.from({ length: 9 }, () => new Set());
    const repeat = (N, how) => parseInt(N.toString().repeat(how));
    const isEqual = (values, number) => {
        return (
            values.filter((value) => parseInt(value) === number).length !== 0
        );
    };

    cache[1].add(N);
    for (let i = 2; i < 9; i++) {
        const paste = repeat(N, i);
        if (paste === number) return i;
        cache[i].add(paste);
        // 3일 때 [1,2] 와 [2,1]을 계산하려면..
        for (let j = 1; j < i; j++) {
            for (const op1 of cache[i - j]) {
                for (const op2 of cache[j]) {
                    const plus = op1 * 1 + op2 * 1;
                    const minus = op1 * 1 - op2 * 1;
                    const multiple = op1 * op2;
                    const divide = parseInt(isNaN(op1 / op2) ? 0 : op1 / op2);
                    if (isEqual([plus, minus, multiple, divide], number))
                        return i;
                    cache[i].add(plus).add(minus).add(multiple).add(divide);
                }
            }
        }
    }
    return -1;
}
console.log(solution(5, 12));

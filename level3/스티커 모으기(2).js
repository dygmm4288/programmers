/* // N 개의 스티커가 원형으로 연결돼 있음
// 몇 장의 스티커를 뜯어내어 뜯어내 ㄴ 스티커에 적힌 숫자의
// 합이 최대가 되도록 하고 싶다. 스티커를 한장 뜯어내면 양쪽으로
// 인접해있는 스티커는 찢어져서 사용할 수 없다.
// 동적프로그래밍
// 근데 N이 1 < 100,000 이하
// 수가 너무 많아서 이진법으로 하기에는 무리가 있어 보인다.
// 처음과 끝이 연결돼 있는 정보는 결국에는 뜯어야 하냐 뜯지 말아야 하냐 이걸 정하기 위함인 것 같고..

function solution(sticker) {
    // 스티커의 배열과 뜯어낸 결과가 최댓값인거..
    // n개의 조각으로 나누면 어떻게 될 수 있지
    // 원형 스티커에서 1개를 뜯어내면 양쪽을 없애고
    // 값을 더한거...
    // 골라야 하는 갯수는 이미 정해져 있는데 이를 어떻게 도출해낼 수 있을 까
    // 스티커를 한개 띠게 되면 무조건 2 ~ 3개는 날라가게 되는데 길이에서 2개씩 짤라버리면 되나
    const n = parseInt(sticker.length / 2);
    if (n === 1) return Math.max(...sticker);
    const selected = Array.from({ length: sticker.length }, () => false);
    const cache = Array.from({ length: sticker.length + 1 }, () => -1);
    console.log(pick(n, 0, selected, cache, sticker));
    console.log(selected);
}
function pick(n, pointer, selected, cache, sticker) {
    if (n <= 0 || pointer >= sticker.length || pointer < 0) {
        // 더 이상 뽑을 스티커가 없을 경우에
        return 0;
    }

    let ret = cache[pointer];
    if (ret !== -1) return ret;

    for (let here = pointer; here < sticker.length; here++) {
        if (!selected[here]) {
            // 만약에 뜯어내지 않은 스티커라면
            let prev = here - 1 < 0 ? sticker.length - 1 : here - 1;
            let next = here + 1 >= sticker.length ? 0 : here + 1;
            // 현재 스티커를 때는 경우와 때지 않는 경우가 생기겠지
            // 현재 스티커를 때는 경우
            ret = Math.max(
                pick(
                    n - 1,
                    here + 2,
                    select(selected, [prev, here, next], true),
                    cache,
                    sticker,
                ) + sticker[here], // 스티커를 때는 경우
                pick(n, here + 1, selected, cache, sticker), // 스티커를 때지 않는 경우
                ret,
            );
        }
    }

    cache[pointer] = ret;
    return cache[pointer];
}
function select(arr, pointers, set) {
    const newArr = [...arr];
    pointers.forEach((point) => (newArr[point] = set));
    return newArr;
}

solution([14, 6, 5, 11, 3, 9, 2, 10]);
 */

// 1차원 dp를 이용한다고?
function solution(sticker) {
    const n = sticker.length;
    let cand = Array.from({ length: n }, () => 0);
    let best = 0;

    const first = sticker[0];

    cand[0] = first;
    cand[1] = first;
    cand = calc(sticker, 2, (i) => i < n - 1, cand);
    best = Math.max(best, cand[n - 1]);

    cand[0] = 0;
    cand[1] = sticker[1];
    cand = calc(sticker, 2, (i) => i < n, cand);

    return Math.max(best, cand[n - 1]);
}
function calc(sticker, start, predi, cand) {
    for (let i = start; predi(i); i++) {
        const pick = cand[i - 2] + sticker[i];
        const nonPick = cand[i - 1];
        cand[i] = Math.max(pick, nonPick);
    }
    return cand;
}

console.log(solution([14, 6, 5, 11, 3, 9, 2, 10]));
console.log(solution([1, 3, 2, 5, 4]));

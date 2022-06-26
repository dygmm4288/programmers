// (위,아래): 카운터, (왼쪽,오른쪽): 카운터
// (위,아래) : 카운터, (왼쪽, 오른쪽 ) : 카운터
function solution(name) {
    // 위 아래
    // abcdef....xyz
    const updown = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5,
        4, 3, 2, 1,
    ];
    const n = name.length;
    const finish = 'A'.repeat(n);
    const move = (delta, n) => (idx) => (idx + delta + n) % n;
    const moveLeft = move(-1, n);
    const moveRight = move(1, n);
    const calcUpdown = (alpha) => updown[alpha.charCodeAt() - 'A'.charCodeAt()];
    const calcACount = (name, index) => {
        const n = name.length;

        let left = 0;
        let right = 0;

        let leftIdx = moveLeft(index, n);
        let rightIdx = moveRight(index, n);
        while (
            (name[leftIdx] === 'A' || name[rightIdx] === 'A') &&
            left < n &&
            right < n
        ) {
            if (name[leftIdx] === 'A') {
                left += 1;
                leftIdx = moveLeft(leftIdx);
            }
            if (name[rightIdx] === 'A') {
                right += 1;
                rightIdx = moveRight(rightIdx);
            }
        }

        return { left, right };
    };

    let ret = 0;
    let index = 0;
    name = name.split('');
    while (true) {
        ret += calcUpdown(name[index]);
        name[index] = 'A';
        if (name.join('') === finish) break;
        const { left, right } = calcACount(name, index); // A의 카운터
        if (left < right) {
            ret += left ? left : 1; // 0이거나 1이상이거나
            index = left ? move(left, n)(index) : move(-1, n)(index); // 1 이상이라면
        } else {
            ret += right ? right : 1;
            index = right ? move(right, n)(index) : move(1, n)(index);
        }
    }
    return ret;
}

console.log(solution('JAZ'));
console.log(solution('JAN'));
console.log(solution('JEROEN'));

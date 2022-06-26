/* 
    엄지손가락은 상하좌우만 이동가능
    1,4,7 왼손
    3,6,9 오른손
    2,5,8,0 현재 키패드의 위치에서 더 가까운 엄지손가락 사용
    같다면 오른손잡이 왼손잡이
 */
function solution(number, hand) {
    let dist = Array.from({ length: 12 }, () =>
        Array.from({ length: 12 }, () => -1),
    );
    const lefts = [1, 4, 7, 10];
    const rights = [3, 6, 9, 11];
    const centers = [2, 5, 8, 0];
    const num = [1, 2, 3, 4, 2, 1, 2, 3, 3, 2, 1, 2, 4, 3, 2, 1];
    const centerNumber = [0, 1, 2, 3, 1, 0, 1, 2, 2, 1, 0, 1, 3, 2, 1, 0];
    let index = 0;
    for (let i = 0; i < lefts.length; i++) {
        const left = lefts[i];
        const right = rights[i];
        const c = centers[i];
        centers.forEach((center) => {
            dist[left][center] = num[index];
            dist[right][center] = num[index++];
            dist[c][center] = centerNumber.shift();
        });
    }
    let leftCur = 10;
    let rightCur = 11;
    const ret = number.reduce((str, n) => {
        const isIn = (item) => item === n;
        console.log({ leftCur, rightCur, n });
        if ([1, 4, 7].filter(isIn).length) {
            leftCur = n;
            str += 'L';
        } else if ([3, 6, 9].filter(isIn).length) {
            rightCur = n;
            str += 'R';
        } else {
            let leftDist = dist[leftCur][n];
            let rightDist = dist[rightCur][n];
            console.log({ leftDist, rightDist });
            if (leftDist === rightDist) {
                if (hand === 'left') {
                    str += 'L';
                    leftCur = n;
                } else {
                    str += 'R';
                    rightCur = n;
                }
            } else if (leftDist < rightDist) {
                str += 'L';
                leftCur = n;
            } else if (rightDist < leftDist) {
                str += 'R';
                rightCur = n;
            }
        }
        console.log({ str });
        return str;
    }, '');
    console.log(ret);
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'));
console.log(solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], 'left'));
/* 
function solution(numbers, hand) {
    var answer = '';
    answer = numbers.reduce((acc,cur) => {
        if(cur === 0) cur = 11;
        if([1,4,7].indexOf(cur) > -1) {
            acc.result += 'L';
            acc.Left = cur;
        } else if([3,6,9].indexOf(cur) > -1) {
            acc.result += 'R';
            acc.Right = cur;
        } else {
            const leftDistance = distance(acc.Left,cur);
            const rightDistance = distance(acc.Right,cur);
            if(leftDistance === rightDistance) {
                const handle = hand === 'right';
                acc.result += handle ? 'R' : 'L';
                handle ? (acc.Right = cur) : (acc.Left = cur);
            }
            else if(leftDistance - rightDistance > 0) {
                acc.Right = cur;
                acc.result += 'R';
            } else {
                acc.Left = cur;
                acc.result += 'L';
            }
        }
            return acc;
    },{result: '',Left: 10,Right: 12});
    return answer.result;
}
function distance(start,end) {
    const upDown = 3;
    const leftRight = 1;
    if(start === end) {
        return 0;
    }
    if(start < end) {
        const nextDown = start + upDown;
        const nextRight = start + leftRight;
        return 1 + ((nextDown > end) ? distance(nextRight,end) : distance(nextDown,end));
    } else {
        const nextUp = start - upDown;
        const nextLeft = start - leftRight;
        return 1 + ((nextUp < end) ? distance(nextLeft,end) : distance(nextUp,end));
    }
}

*/

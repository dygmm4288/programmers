/* 
    

*/
function solution(n, build_frame) {
    // build_frame [x,y,a,b]
    // x,y 기둥 좌표
    // a  0 : 기둥, 1: 보
    // b 0 : 삭제, 1 : 설치\

    const board = Array.from({ length: 2 }, () =>
        Array.from({ length: n + 1 }, () =>
            Array.from({ length: n + 1 }, () => 0),
        ),
    );
    //board[a][y][x] = b;
    let cnt = 1;
    build_frame.forEach(([x, y, a, b]) => {
        board[a][y][x] = b;
        if (!isValid(board, n)) board[a][y][x] = b === 0 ? 1 : 0;
        console.log(cnt++, { x, y, a, b }, board[a][y][x]);
    });

    const ret = [];

    for (let x = 0; x < n + 1; x++) {
        for (let y = 0; y < n + 1; y++) {
            for (let a = 0; a < 2; a++) {
                if (board[a][y][x] === 1) ret.push([x, y, a]);
            }
        }
    }

    console.log(ret);
    return ret;
}
function isValid(board, n) {
    /* 
    기둥 : 바닥 위에 있거나 보의 한쪽 끝에 있거나 또는 다른 기둥 위에 있어야 한다.
    보 : 한쪽 끝 부분이 기둥 위에 있거나, 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 한다.
     */
    for (let y = 0; y <= n; y++) {
        for (let x = 0; x <= n; x++) {
            for (let a = 0; a < 2; a++) {
                if (a === 0 && board[a][y][x]) {
                    // 기둥
                    // 바닥위 || 보의 한쪽 끝 || 다른 기둥 위
                    // (바닥위)' && (보의한쪽끝)' && (다른기둥위)'
                    // 바닥위에 있지도 않으면서, 보의 한쪽끝에도 없으면서, 다른 기둥위에도 없으면
                    // 유효하지 않다라고 본다
                    // 만약에 y === 0 이라면
                    if (
                        y === 0 ||
                        board[1][y][x - 1] === 1 ||
                        board[1][y][x] === 1 ||
                        board[0][y - 1][x] === 1
                    )
                        continue;
                    return false;
                } else if (a === 1 && board[a][y][x]) {
                    // 보
                    // 한쪽 끝 기둥 위
                    // 양쪽 끝이 다른 보와 동시에 연결
                    if (
                        board[0][y - 1][x] === 1 ||
                        board[0][y - 1][x + 1] === 1 ||
                        (board[1][y][x - 1] === 1 && board[1][y][x + 1] === 1)
                    )
                        continue;
                    return false;
                }
            }
        }
    }
    return true;
}
solution(5, [
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [2, 1, 0, 1],
    [2, 2, 1, 1],
    [5, 0, 0, 1],
    [5, 1, 0, 1],
    [4, 2, 1, 1],
    [3, 2, 1, 1],
]);
solution(5, [
    [0, 0, 0, 1],
    [2, 0, 0, 1],
    [4, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [2, 0, 0, 0],
    [1, 1, 1, 0],
    [2, 2, 0, 1],
]);
/* 
const n = 5;
const board = Array.from({ length: 2 }, () =>
    Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => 0)),
);
board[0][0][0] = 1;
board[0][1][2] = 1;
console.log(isValid(board, n));
 */

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
    [4, 1, 1, 1],
    [4, 1, 1, 0],
]);
/* // 기둥은 바닥 위에 있거나 보의 한쪽 끝 부분 위에 있거나, 또는 다른 기둥 위에 있어야 한다.
// 보는 한쪽 끝 부분이 기둥 위에 있거나, 또는 양쪽 끝 부분이 다른 보와 동시에 연결되어야 한다.
// 2차원 벽면은 N x N 크기 정사각 격자 형태이며, 각 격자는 1x1 크기이다.
// 맨 처음 벽면은 비어 있는 상태이다. 기둥과 보는 격자선의 교차점에 걸치지 않고, 격자 칸의 각 변에 정확히 일치하도록 설치할 수 있다.
// 크기를 두배로 늘려서 확인하는 방법이 있지 않을까

function solution(n, build_frame) {
    const size = 2 * (n + 1);
    const board = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => -1),
    );
    // structure에 구조물을 쉽게 지우고 없애버린 다음에 둘다 배열에 넣고 한꺼번에 정렬
    const structure = Array.from({ length: 2 }, () => []);

    // a === 0 : 기둥, a === 1 : 보
    // b === 0 : 삭제, b === 1 : 설치
    // 설치 시 기둥은 위로 보는 오른쪽으로

    // 기둥은 설치될 시
    // y === 0 이거나 혹은 (x,y) > -1 보다 커야 함

    // 보 설치될 시 (x,y) > -1보다 커야 함

    // 기둥삭제시 (y,x+1) === 1 {보 설치} (y+1,x) === 0 {기둥설치}
    // 보삭제시   (y+1,x) === 0 {기둥설치} (y,x+1) === 1 {보설치}
    build_frame.forEach(([x, y, a, b]) => {
        y *= 2;
        x *= 2;
        console.log({ y, x, a, b });
        if (b === 0) {
            // 삭제 시
            if (board[y][x + 2] !== 1 && board[y + 2][x] !== 0) {
                board[y][x] -= 1;
                let start = a === 0 ? y + 1 : x + 1;
                for (let i = start; i <= start + 1; i++) {
                    if (a === 0) board[i][x] -= 1;
                    else board[y][i] -= 1;
                }

                structure[a] = structure[a].filter(
                    ({ y: dy, x: dx }) => dy !== y || dx !== x,
                );
            }
        } else {
            // 설치 시
            if (
                board[y][x] > -1 ||
                (a === 0 && y === 0) ||
                board[y][x + 2] > -1
            ) {
                board[y][x] += 1;
                let start = a === 0 ? y + 1 : x + 1;
                for (let i = start; i <= start + 1; i++) {
                    if (a === 0) board[i][x] += 1;
                    else board[y][i] += 1;
                }
                structure[a].push({ y, x });
            }
        }
    });
    const ret = structure.reduce(
        (a, c, i) => [...a, ...c.map(({ y, x }) => [x / 2, y / 2, i])],
        [],
    );
    ret.sort((a, b) => {
        if (a[0] === b[0]) {
            if (a[1] === b[1]) {
                return b[2] - a[2];
            }
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
    console.log(ret);
    // return 하는 배열은 [x,y,a] 형식
    // a 는 기둥인지 보인지
}

 */

/* function solution(n, build_frame) {
    let buildings = [];
    const compare = (x1, y1, a1) => (x2, y2, a2) =>
        x1 === x2 && y1 === y2 && a1 === a2;

    const isValid = (buildings) => {
        const len = buildings.length;
        if (len === 1) return true;
        for (let i = 0; i < len; i++) {
            const [x, y, a] = buildings[i];
            if (a == 0) {
                console.log(
                    { x, y, a },
                    'if statement',
                    buildings.findIndex(
                        (building) =>
                            compare(...building)(x, y, 1) ||
                            compare(...building)(x - 1, y, 1) ||
                            compare(...building)(x, y - 1, 0),
                    ),
                );
                if (
                    y === 0 ||
                    buildings.findIndex(
                        (building) =>
                            compare(...building)(x, y, 1) ||
                            compare(...building)(x - 1, y, 1) ||
                            compare(...building)(x, y - 1, 0),
                    ) !== -1
                )
                    continue;
                return false;
            } else {
                console.log(
                    { x, y, a },
                    'if statement',
                    buildings.findIndex(
                        (building) =>
                            compare(...building)(x, y - 1, 0) ||
                            compare(...building)(x + 1, y - 1, 0) ||
                            compare(...building)(x + 1, y, 1) ||
                            compare(...building)(x - 1, y, 1),
                    ),
                );
                if (
                    buildings.findIndex(
                        (building) =>
                            compare(...building)(x, y - 1, 0) ||
                            compare(...building)(x + 1, y - 1, 0) ||
                            (compare(...building)(x + 1, y, 1) &&
                                compare(...building)(x - 1, y, 1)),
                    ) !== -1
                )
                    continue;
                return false;
            }
        }
        return true;
    };

    build_frame.forEach(([x, y, a, b]) => {
        console.log({ x, y, a, b });
        if (b === 0) {
            // 삭제
            console.log('before delete', buildings);
            buildings = buildings.filter(
                (building) => !compare(x, y, a)(...building),
            );
            console.log('filtering delete', buildings);
            if (!isValid(buildings)) buildings.push([x, y, a]);
            console.log('after delete', buildings);
        } else {
            // 설치
            console.log('before insert', buildings);
            buildings.push([x, y, a]);
            console.log('insert', buildings);
            console.log('isValid?', isValid(buildings));
            if (!isValid(buildings)) buildings.pop();
            console.log('after insert', buildings);
        }
    });

    buildings.sort();
    console.log(buildings);
    return buildings;
}

function solution(n, build_frame) {
    let buildings = [];

    const compare = (x1, y1, a1) => (x2, y2, a2) =>
        x1 === x2 && y1 === y2 && a1 === a2;
    const pillar = (rets) => rets[0] || rets[1] || rets[2] || rets[3];
    const beam = (rets) => rets[0] || rets[1] || (rets[2] && rets[3]);

    const how = (pillar, beam) => (a, rets) =>
        a === 0 ? pillar(rets) : beam(rets);

    const isValid = (buildings) => {
        const len = buildings.length;
        const comparing = how(pillar, beam);
        for (let i = 0; i < len; i++) {
            const [x, y, a] = buildings[i];
            const predicts =
                a === 0
                    ? [
                          [x, y - 1, 0],
                          [x, y, 1],
                          [x - 1, y, 1],
                      ]
                    : [
                          [x, y - 1, 0],
                          [x + 1, y - 1, 0],
                          [x + 1, y, 1],
                          [x - 1, y, 1],
                      ];
            const rets = predicts.map((predi) => {
                for (let j = 0; j < len; j++) {
                    if (compare(...predi)(...buildings[j])) return true;
                }
                return false;
            });
            if (a === 0) rets.push(y === 0);
            if (comparing(a, rets)) continue;
            return false;
        }
        return true;
    };
    build_frame.forEach(([x, y, a, b]) => {
        if (b === 0) {
            const filtering = compare(x, y, a);
            buildings = buildings.filter((build) => !filtering(...build));
            if (!isValid(buildings)) buildings.push([x, y, a]);
        } else {
            buildings.push([x, y, a]);
            if (!isValid(buildings)) buildings.pop();
        }
    });
    buildings.sort();
    return buildings;
} */
/* function solution(n, build_frame) {
    const board = Array.from({ length: n + 1 }, () =>
        Array.from({ length: n + 1 }, () =>
            Array.from({ length: 2 }, () => false),
        ),
    );
    const isValid = ([x, y, a, b], board) => {
        if (x < 0 || x > n || y < 0 || y > n) return false;
        if (b === 0) {
            if (a === 0) {
                return (
                    isValid([x - 1, y + 1, 1, 1], board) &&
                    isValid([x, y + 1, 1, 1], board) &&
                    isValid([x, y + 1, 0, 1], board)
                );
            } else {
                return (
                    isValid([x, y - 1, 0, 1], board) &&
                    isValid([x + 1, y - 1, 0, 1], board) &&
                    isValid([x - 1, y, 1, 1], board) &&
                    isValid([x + 1, y, 1, 1], board)
                );
            }
        } else {
            if (a === 0) {
                return (
                    y === 0 ||
                    (x - 1 >= 0 ? board[x - 1][y][1] : false) ||
                    (x + 1 <= n ? board[x + 1][y][1] : false) ||
                    (y - 1 >= 0 ? board[x][y - 1][0] : false)
                );
            } else {
                return (
                    (y - 1 >= 0 ? board[x][y - 1][0] : false) ||
                    (x + 1 <= n && y - 1 >= 0
                        ? board[x + 1][y - 1][0]
                        : false) ||
                    (x - 1 >= 0 && x + 1 <= n
                        ? board[x - 1][y][1] && board[x + 1][y][1]
                        : false)
                );
            }
        }
    };
    build_frame.forEach(([x, y, a, b]) => {
        const temp = board[x][y][a];
        console.log({ x, y, a, b });
        board[x][y][a] = !temp;
        console.log(isValid([x, y, a, b], board));
        if (!isValid([x, y, a, b], board)) board[x][y][a] = temp;
    });
    const ret = [];
    for (let x = 0; x <= n; x++) {
        for (let y = 0; y <= n; y++) {
            for (let a = 0; a < 2; a++) {
                if (board[x][y][a]) ret.push([x, y, a]);
            }
        }
    }
    console.log(ret);
    return ret;
}
 */
function solution(n, build_frame) {
    const board = Array.from({ length: n + 1 }, () =>
        Array.from({ length: n + 1 }, () =>
            Array.from({ length: 2 }, () => false),
        ),
    );
    const isValid = () => {};
    build_frame.forEach(([x, y, a, b]) => {
        const temp = board[x][y][a];
        board[x][y][a] = !temp;
        if (isValid()) board[x][y][a] = temp;
    });
}

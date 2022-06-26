function solution(places) {
    return places.map((place) => isKeepDistance(place));
}
function isKeepDistance(place) {
    const dy = [0, 1, 0, 2, 1, -1],
        dx = [1, 0, 2, 0, 1, 1];
    const isIn = (y, x) => 0 <= y && y < 5 && 0 <= x && x < 5;

    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (place[y][x] === 'P') {
                for (let i = 0; i < 6; i++) {
                    const nextY = y + dy[i],
                        nextX = x + dx[i];
                    if (!isIn(nextY, nextX)) continue;
                    if (i < 2 && place[nextY][nextX] === 'P') {
                        return 0;
                    } else if (i < 5 && place[nextY][nextX] === 'P') {
                        if (i === 2) {
                            if (place[nextY][nextX - 1] === 'O') return 0;
                        } else if (i === 3) {
                            if (place[nextY - 1][nextX] === 'O') return 0;
                        } else {
                            if (
                                place[nextY - 1][nextX] === 'O' ||
                                place[nextY][nextX - 1] === 'O'
                            )
                                return 0;
                        }
                    } else {
                        if (place[nextY][nextX] === 'P') {
                            if (
                                place[nextY + 1][nextX] === 'O' ||
                                place[nextY][nextX - 1] === 'O'
                            )
                                return 0;
                        }
                    }
                }
            }
        }
    }
    return 1;
}

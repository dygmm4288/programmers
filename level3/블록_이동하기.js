class Cord {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}
function solution(board) {
    let cur = new Cord(1, 1, 1, 2);
    const n = board.length;
    let cache = Array.from({ length: 2 }, () =>
        Array.from({ length: n }, () =>
            Array.from({ length: n }, () => Infinity),
        ),
    );
    
}

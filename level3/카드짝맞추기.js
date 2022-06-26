function solution(board, r, c) {
    // 고르는 순서에 따라서 값이 달라질 수 있는데..
    // 어떤 숫자가 있는지를 확인을 해야 할 듯
    const uniq = new Set(board.flat());
    uniq.delete(0);
    const perm = permutation([...uniq], uniq.size);

    perm.reduce((a,order) => {
        
        const table = [...board];
        
        



    },Infinity);
}
function search(y,x,board,number) {
    // ctrl 로 한번에 움직이거나
    // 그냥 커서로 움직이거나
    const cand = [];
    for(let i = 0;i<4;i++) {
        for(let j = 0;j<4;j++) {
            if(board[i][j] === number) cand.push([i,j]);
        }
    }
    
    let ret = 2;
    let dist = Infinity;

    for(const [ny,nx] of cand) {
        
    }
}
function permutation(arr, n) {
    if (n === 1) return arr.map((v) => [v]);

    let result = [];

    arr.forEach((fixed, idx, arr) => {
        const rest = arr.filter((_, index) => index !== idx);
        const perms = permutation(rest, n - 1);
        const combine = perms.map((v) => [fixed, ...v]);
        result.push(...combine);
    });
    return result;
}
solution([
    [1, 0, 0, 3],
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [3, 0, 1, 0],
]);

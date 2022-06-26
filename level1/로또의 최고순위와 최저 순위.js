function solution(lottos, win_nums) {
    let zero_cnt = 0;
    let correct_cnt = 0;

    const ranking = [6, 6, 5, 4, 3, 2, 1];

    lottos.forEach((lotto) => {
        if (lotto === 0) zero_cnt++;
        else if (win_nums.find((num) => num === lotto)) correct_cnt++;
    });

    const best = [0, 0];
    best[0] = ranking[correct_cnt + zero_cnt];
    best[1] = ranking[correct_cnt];

    return best;
}
/* 
정답코드
function solution(lottos, win_nums) {
    let zeroCnt = 0;
    let corretCnt = 0;
    // 맞은 개수를 인덱스로 
    const score = [6,6,5,4,3,2,1];
    
    lottos.forEach(lotto => {
        if(lotto === 0) {
            zeroCnt += 1;
        }
        
        else if(win_nums.find(num => num === lotto)) {
            corretCnt += 1;
        }
    });
    
   return [score[corretCnt + zeroCnt], score[corretCnt]]; 
}
 */

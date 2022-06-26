function solution(genres, plays) {
    // 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시
    // 노래는 고유번호로 구분, 노래를 수록하는 기준
    // 1. 속한 노래가 많이 재생된 장르를 먼저 수록
    // 2. 장르 내에서 많이 재생된 노래를 먼저 수록
    // 3. 장르 내에서 재생 횟수가 같은 노래 중에서는

    const music = new Map();
    const gMap = new Map();
    const n = plays.length;

    for (let i = 0; i < n; i++) {
        const genre = genres[i];
        const play = plays[i];
        if (!gMap.has(genre)) gMap.set(genre, 0);
    }
}

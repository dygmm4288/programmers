function solution(jobs) {
    jobs.sort((a, b) => a[0] - b[0]); // 요청이 들어오는 시점을 정렬
    const pq = [];

    // 수행 시간이 짧은 작업부터 처리
    // 하나의 작업이 끝난 시점에서 들어온 요청에 대해서
    // 가장 짧은 수행시간을 가진 작업을 선택

    let time = jobs[1],
        total = 0;
    let idx = 1;
    while (idx < jobs.length || pq.length !== 0) {
        // 모든 작업을 하나하나 하면서
        if (idx < jobs.length && time >= jobs[idx]) {
            // 하나의 작업이 끝난 시점에서
            // 들어온 요청이 있을 경우
            pq.push(jobs[idx++]);
            continue;
        }
        // 지금 시점에서 들어올 수 있는 요청이 모두 모인경우

        // 가장 짧은 소요(수행)시간을 가진 것을 하나 선택하고
        // 내 뱉고
        if (pq.length !== 0) {
            pq.sort((a, b) => a[1] - b[1]);
            const job = pq.shift();
            time += jobs[idx][1]; // 소요시간을 더하고..
            // 전체 시간에는 요청시간에서 끝난시간을 더해줘야지
            total += time - jobs[idx][0];
        } else {
            time = jobs[idx][0];
        }
    }
    return parseInt(totle / jobs.length);
}
/* 
    정답코드
function solution(jobs) {
    jobs.sort((a, b) => a[0] - b[0]);
    const pq = [];
    let time = 0,
        total = 0,
        cnt = 0;
    while (cnt < jobs.length || pq.length !== 0) {
        //가장 빨리 끝나는거 찾기

        if (cnt < jobs.length && jobs[cnt][0] <= time) {
            pq.push(jobs[cnt++]);
            pq.sort((a, b) => a[1] - b[1]);
            continue;
        }       

        if (pq.length !== 0) {
            const here = pq.shift();
            time += here[1];
            total += time - here[0];
        } else {
            time = jobs[cnt][0];
        }
    }


    return parseInt(total / jobs.length);
}

*/

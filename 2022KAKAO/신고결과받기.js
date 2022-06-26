// 각 유저는 한 번에 한 명의 유저를 신고할 수 있다.
// 1. 신고 횟수에 제한이 없다
// 2. 한 유저를 여러 번 신고할 수 있지만 동일한 유저에 대한 신고 횟수는 1회로 처리된다.
// k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지사실 메일 발송
function solution(id_list, report, k) {
    const mapping = new Map();
    id_list.forEach((id, i) => {
        mapping.set(id, i);
    });
    const n = mapping.size;

    // 누굴 신고했는지랑
    const who = Array.from({ length: n }, () => new Set());
    // 누가 몇번 신고당했는지랑
    const count = Array.from({ length: n }, () => 0);

    report.forEach((str) => {
        const [a, b] = str.split(' ').map((s) => mapping.get(s));
        if (!who[a].has(b)) {
            who[a].add(b);
            count[b] += 1;
        }
    });

    return who.map((reported) => {
        reported = [...reported];
        return reported.reduce((a, c) => {
            if (count[c] >= k) a += 1;
            return a;
        }, 0);
    });
}

/* 
    정답코드

    function solution(id_list, report, k) {
    const map = new Map();
    const n = id_list.length;
    const userList = Array.from({ length: n }, () => new Set());
    const reportedCnt = Array.from({ length: n }, () => 0);

    id_list.forEach((id, i) => {
        map.set(id, i);
    });

    report.forEach((r) => {
        const [user, reported] = r.split(" ");
        const userIdx = map.get(user);
        const reportedIdx = map.get(reported);
        if (!userList[userIdx].has(reported)) {
            reportedCnt[reportedIdx]++;
            userList[userIdx].add(reported);
        }
    });

    return id_list.map((id, i) => {
        let cnt = 0;
        for (let user of userList[i]) {
            const reportedIdx = map.get(user);
            cnt += reportedCnt[reportedIdx] >= k ? 1 : 0;
        }
        return cnt;
    });
}
*/

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

console.log(
    solution(
        ["muzi", "frodo", "apeach", "neo"],
        ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"],
        2
    )
);
console.log(
    solution(
        ["con", "ryan"],
        ["ryan con", "ryan con", "ryan con", "ryan con"],
        3
    )
);

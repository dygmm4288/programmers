// 채팅방을 들어올 시
// 채팅방을 나갈시
// 닉네임 변경 방법
// 1. 채팅방을 나간 후 새로운 닉네임으로 다시 들어온다.
// 2. 채팅방에서 닉네임을 변경한다.
/* 
    오픈채팅방
    -> "해시맵"을 이용한 문제
 */

// -> 닉네임을 변경할 때는 기존에 채팅방에 출력되어 있던 메시지의 닉네임도 전부 변경된다.
function solution(record) {
    const idMap = new Map();

    record.forEach((r) => {
        const [cmd, id, nick] = r.split(' ');
        if (cmd !== 'Leave') idMap.set(id, nick);
    });

    return record.reduce((a, c) => {
        const [cmd, id] = c.split(' ');
        if (cmd !== 'Change') {
            a.push(
                `${idMap.get(id)}님이 ${
                    cmd === 'Enter' ? '들어왔' : '나갔'
                }습니다.`,
            );
        }
        return a;
    }, []);
}

// 통과 풀이
function solution(record) {
    const entered = [];
    const idMap = new Map();
    for (let i = 0, len = record.length; i < len; i++) {
        const [enter, id, nick] = record[i].split(' ');
        if (nick) idMap.set(id, nick);
        if (enter !== 'Change') entered.push([enter, id]);
    }

    return entered.map(([enter, id]) => {
        let str = idMap.get(id) + '님이 ';
        str += enter === 'Enter' ? '들어왔습니다.' : '나갔습니다.';
        return str;
    });
}

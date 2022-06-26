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
